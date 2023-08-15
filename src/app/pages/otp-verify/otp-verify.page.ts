import { Component, OnInit } from '@angular/core';
import { RegisterationFormDataService } from '../registration/data.service';
import { RegisterUserDetail, getRegistrationForm } from '../registration/forms';
import { environment } from '../../../environments/environment.prod';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {auth as firebaseAuth} from 'firebase';
import { presentToast, limitInputFieldLength } from 'src/app/utils/utils';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
})
export class OtpVerifyPage implements OnInit {
  authStatus: string;
  countdownTimer=true;
  countDownTime:number = environment.OTP_COUNTDOWN_TIME;
  registrationData:any;
  registrationForm:any;
  isSubmitted:boolean = false;
  dataSubscription:any;
  authSubscription:any;
  inValidOTP:boolean = false;
  resendPending:boolean=false;
  verificationId:string;
  verificationCode:string;
  subscription;
  deviceId;
  referrer;

  constructor(private registerDataService:RegisterationFormDataService, private formBuilder:FormBuilder, 
    private authService:AuthenticationService, private router:Router, private smsRetriever: SmsRetriever, 
    private device:Device, private fcm:FCM, private platform: Platform, private alertCtrl:AlertController,
    private analytics:FirebaseAnalytics) { 
  }

  ngOnInit() {
    this.dataSubscription = this.registerDataService.formDataSource.subscribe(data =>{              
        this.registrationData = new RegisterUserDetail().initializeOTPFormControl();
        this.verificationId = data['pk'];
        this.registrationData['otp_ref'] = data.pk;
        this.registrationData['phone_number'] = data.phone_number;
        this.registrationData['country_code'] = data.country_code;
        if(!this.verificationId)this.router.navigate(['/']);
        this.registrationForm = getRegistrationForm(this.registrationData, this.formBuilder);
        this.registrationForm.isSubmitted=false;
        const self =this; 
        this.watchForOTP();
      },
      err => console.debug('=====>>>>', err)
    );

    const self = this;
    if(this.platform.is('cordova')){
      window['cordova']['plugins']['referrer'].get((referrer) => {
          self.referrer = referrer;
      }, (error) => {
          console.log('Error referrer:', error);
      });
    }
    if(!self.referrer)self.referrer = localStorage.getItem('referral');
    this.deviceId =this.device.uuid;
    console.log(this.deviceId, 'deviceID.......................');

  }

  watchForOTP(){
    this.smsRetriever.getAppHash().then(res=>{
      console.log('app hash code:', res);
    }).catch(res=>{
      console.log('error', res);
    })
    this.smsRetriever.startWatching().then(res=>{
      var SMS = res['Message'];
      console.log('message....', res);
      const otp_text = (new RegExp(/[0-9]{6}/).exec(SMS));
      if(otp_text && SMS.toLowerCase().indexOf('mpw')>-1){
        this.registrationForm.patchValue({'otp':otp_text[0]});
        this.onSubmit();
      }          
    }).catch(err=>{})       
  }

  onInputOTP(event){
    console.debug(this.registrationForm.valid, this.registrationForm);
    if(event.target.value.trim().length === 6 && parseInt(event.target.value.trim())){
      const self=this;
      setTimeout(function(){self.onSubmit();}, 100);
    }
    return limitInputFieldLength(event,'app-otp-verify input[type=tel]', 6);    
  }

  onSubmit(){    
    let data = this.registrationForm.value;
    if(this.isSubmitted)return;
    this.isSubmitted=true;
    data['device_id'] = this.deviceId;
    data['referrer'] = this.referrer;
    this.authSubscription =  this.authService.login(data).subscribe(data => {
        // if(!data.email)this.router.navigate(['/user-detail-prompt'], {replaceUrl:true});
        // else 
        this.router.navigate(['/tabs/home'], {replaceUrl:true});
        this.registrationForm.reset();
        this.isSubmitted = false;      

        this.fcm.getToken().then(token => {
          console.log('get token fcm....');
          this.updateToken(token);
        });    
        
        this.fcm.onTokenRefresh().subscribe(token => {
          console.debug('token refreshed......',token);
          this.updateToken(token);
        });       

        this.analytics.setUserId(data.username);

      },err => {
        this.isSubmitted = false;
        this.inValidOTP = true;
    });    
  }

  updateToken(token){
    if(this.subscription)this.subscription.unsubscribe();
    let name = this.device.manufacturer +" "+ this.device.model+ " "+ this.device.version;
    console.log('updating fcm token...');
    this.subscription = this.authService.registerToken(token, name, this.device.uuid, 
      this.device.platform.toLowerCase()).subscribe(()=>{});  
  }  


  timerComplete(event){    
    if(event.action==='done') this.countdownTimer=false;
  }

  resendSMS(event){
    if(this.resendPending)return;
    this.resendPending=true;
    const request_data = this.registrationForm.value;
    console.debug('rquest_data', request_data);
    request_data['phone_number'] = `${request_data['country_code']||'+91'}${request_data['phone_number']}`;
    this.authService.register(request_data).subscribe(data=>{
      this.countDownTime = environment.OTP_COUNTDOWN_TIME;
      this.countdownTimer=true;
      this.registrationData['otp'] = "";
      this.registrationData['otp_ref'] = data['pk'];        
      this.resendPending=false;
      this.inValidOTP=false;
      this.registrationForm = getRegistrationForm(this.registrationData, this.formBuilder);
      this.watchForOTP();
    },error=>{
      this.resendPending=false;
      presentToast('Something went wrong please try again.');
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.dataSubscription)this.dataSubscription.unsubscribe();
    if(this.authSubscription)this.authSubscription.unsubscribe();
  }
}
