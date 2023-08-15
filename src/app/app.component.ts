import { Component, isDevMode } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';
import { CodePush, InstallMode } from '@ionic-native/code-push/ngx';
import { SavingGoalDataService } from './pages/saving-goal/saving-goal-data.service';
import { presentAlert } from './utils/utils';
import { SavingGoalModel, User } from './pages/saving-goal/create-saving/model';
import { TabsPage } from './tabs/tabs.page';
import { InProgressSavingService } from './services/inprogress.saving.service';
import { SavingService } from 'src/app/services/saving.service';
import { CurrentUserDataService } from './services/current-user.data.service';
import { OtpVerifyPage } from './pages/otp-verify/otp-verify.page';
import { Subscription } from 'rxjs';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';


// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  notMobile:boolean=false;
  slot: string = 'bottom';
  tabIcon: string = 'icon-top'; 
  loggedIn:boolean=true;
  loader:any;
  subscription;
  subscriptions:Array<Subscription>=[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private authService: AuthenticationService, private router: Router,
    private device:Device, private inprogessSaving:InProgressSavingService,
    private fcm: FCM, private codePush: CodePush, private savingGoalData:SavingGoalDataService, 
    private savingService:SavingService, private currentUser:CurrentUserDataService, 
    private firebaseDynamicLinks:FirebaseDynamicLinks, private analytics:FirebaseAnalytics) {
      
    this.initializeApp();
    if(this.platform.is('desktop') ){
      this.notMobile=true;  
      this.slot = 'top';
      this.tabIcon = "icon-start";              
    }
    let user = authService.getcurrentUserValue();
    if(user){           
      router.navigate(['/tabs/home'], {skipLocationChange:true});
      //else router.navigate(['/user-detail-prompt'], {skipLocationChange:true});
    } 

  }

  onActivateRoute(event){
   if(event instanceof TabsPage){
      this.subscriptions.push(this.authService.syncUserDetail().subscribe(user=>{
        this.currentUser.setData(user);
      })
      )
      this.subscriptions.push(this.savingService.getSavingGoalAll(undefined, 5).subscribe(data=> {
          this.inprogessSaving.setData(data);
        },
        err=>{
          console.log("error occurred: ",err);;
        }
      ))
    }
    else if(event instanceof OtpVerifyPage){
      this.authService.set_data(null);
      this.currentUser.setData(null);
      this.inprogessSaving.setData(null);
    }
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();               
      if(this.platform.is('cordova')){
        this.registerNoitificationReciever();        
        this.checkCodePush();
      }
      this.onDynamicLinks();
      this.trackScreenView();
    });
  }

  registerNoitificationReciever() {
    
    this.fcm.onNotification().subscribe(data => {
      if(data.hasOwnProperty('saving')){
        const saving  = typeof(data.saving ) === 'string' ? JSON.parse(data.saving) : data.saving;
        const save = new SavingGoalModel(saving);
        this.savingGoalData.setData(save);
        console.debug(saving, save);
        if(data.hasOwnProperty('reminder') && data.reminder) this.router.navigate(['/reminder-detail']);          
        else this.router.navigate(['/saving-detail']);
      }
      else if(data.hasOwnProperty('alert')){
        const alert = typeof(data.alert ) === 'string' ? JSON.parse(data.alert) : data.alert;
        presentAlert(alert.message, alert);
      }
      else if(data.hasOwnProperty('reward')){
        this.router.navigate(['/rewards']);
      }
    });

    this.fcm.getToken().then(token => {
      this.updateToken(token);
    });    
    
    this.fcm.onTokenRefresh().subscribe(token => {
      console.debug('token refreshed......',token);
      this.updateToken(token);
    });
    
  } 

  updateToken(token){
    if(this.subscription)this.subscription.unsubscribe();
    let name = this.device.manufacturer +" "+ this.device.model+ " "+ this.device.version;
    console.log('updating fcm token...');
    this.subscription = this.authService.registerToken(token, name, this.device.uuid, 
      this.device.platform.toLowerCase()).subscribe(()=>{});  
  }

  checkCodePush() {    
    console.debug('check code push....')
    this.codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: "\n\nChange log:\n"   
      },
      installMode: InstallMode.IMMEDIATE
    }).subscribe(
      (data) => {
        console.log('CODE PUSH SUCCESSFUL: ' + data);     
      },
      (err) => {
        console.log('CODE PUSH ERROR: ' + err);    
    });
  }
  
  onDynamicLinks(){
    console.log('on dyanic link registered...');
    this.firebaseDynamicLinks.onDynamicLink().subscribe((res: any) => {
      console.debug('found dynamic link.....', res);
      if(res.deepLink.indexOf('refCode=')>-1){
        localStorage.setItem("referral", res.deepLink);
      }
      else console.debug("deeplink", res.deepLink);
    }, 
      (error:any) => {
        console.debug("dyanmic link error",error);
    });    
  }

  trackScreenView(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){        
        this.analytics.logEvent('screen_view', {page: event.url}).then((res)=>{
          console.debug('tracked...page', res);
        }).catch((err)=>{
          console.debug("done.....", err);
        });
      }
    });
  }

}
