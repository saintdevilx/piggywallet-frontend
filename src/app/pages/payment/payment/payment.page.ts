import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SavingGoalFormDataService } from '../../saving-goal/create-saving/data.service';
import { SavingService } from 'src/app/services/saving.service';
import { ToastController } from '@ionic/angular';
import { DataService } from '../data.service';
import { presentToast, presentAlert, getUrlParams } from 'src/app/utils/utils';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';

//declare var paytm : any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  summaryData;
  requestStatus:boolean=false;
  installedUPIapps:any=null;
  selectedUPI:any=null;
  transactionData:any;
  subscriptions:Array<Subscription>=[];
  userProfileComplete:boolean=false;
  userData;

  constructor(private formDataService:SavingGoalFormDataService, private route:Router,
    private savingService:SavingService, private toastController: ToastController,
    private dataService:DataService,private cd: ChangeDetectorRef, 
    private authService:AuthenticationService) { }

  ngOnInit() {
    const self = this;
    this.subscriptions.push(this.formDataService.formDataSource.subscribe(data=>{
      console.debug('subscribed values......', data);
      this.summaryData = data;
      if(window['UPI']){
        console.debug('upiiii apss finding....');
        window['UPI'].supportedApps(function(apps){
          console.debug('got supported appss list....', apps);
          self.installedUPIapps = apps.map(item=>{
            item.appIcon = window['Ionic'].WebView.convertFileSrc(item.appIcon);
            return item;
          });
          console.debug(apps, self.installedUPIapps);
        }, function(err){
          console.debug('err:', err);
          this.installedApps=[];
        })
      }
      else this.installedUPIapps=[];
    }));

    this.subscriptions.push(
      this.authService.currentUser.subscribe((user)=>{
        console.log('change user.........', user);
        this.userData=user;
        console.log('profileCOmplete');
        this.cd.detectChanges();
      })
    );

  }

  selectUPIService(app){
    this.selectedUPI = app;
    try{
      console.debug((this.selectedUPI && this.selectedUPI.appId === app.appId) ? 'selected-upi' : '', this.selectedUPI);
      if(this.selectedUPI.hasOwnProperty('appId'))console.debug(this.selectedUPI.appId);
    }catch(e){console.debug('exception', e);}
    console.debug(app, 'selected...');
  }

  async presentToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();   
  }   

  resetRequestStatus(){
    console.debug('reseting request status');
    this.requestStatus = false;
    this.cd.detectChanges();
  }


  payViaUPI(data, ignore){
    console.debug('data',data,'ignore', ignore);
    if(!data['UPI']||(!ignore && !this.selectedUPI))return;
    const self = this;
    if(window['UPI']){
      window['UPI'].acceptPayment(data['UPI'], ignore ? null : this.selectedUPI, function(res){
        console.debug('successsfull payment', arguments, res);
        data['response'] = res;
        let txnId = res.txnId ? res.txnId : getUrlParams(res.message)['txnId'];
        self.resetRequestStatus();
        console.debug('txnId', txnId, txnId.length);
        if(txnId && txnId.length && txnId !='null'){
          console.debug('setings transaction data', data['transaction_data']);
          self.dataService.setData(data['transaction_data']);
          self.route.navigate(['/transaction-detail'], { replaceUrl: true });   
        }     
      }, function(res){
        console.debug('error ',arguments);
        self.resetRequestStatus();
        data['response'] = res;
      });
    }
    else{
      this.requestStatus = false;  
    }
  }

  onPayment(event, ignoreSelectedUpi=false){
    if(this.requestStatus)return;
    this.requestStatus = true;
    this.summaryData['amount'] = this.summaryData['deduction_amount'];
    this.summaryData['paymentModes'] = ['upi']
    console.debug(this.summaryData,' summary Data;;;;');    
    if(this.transactionData){
      return this.payViaUPI(this.transactionData, ignoreSelectedUpi);
    }
    this.subscriptions.push(this.savingService.depositPayment(this.summaryData).subscribe(
      data => {       
        console.debug(data);
        this.transactionData = data;
        this.requestStatus = false;        
        this.payViaUPI(data, ignoreSelectedUpi);
        this.subscriptions.forEach(sub=>sub.unsubscribe());
      },
      error => {
        this.presentToast("Oops something went wrong. could not complete the transaction.");
        this.requestStatus = false;
        this.subscriptions.forEach(sub=>sub.unsubscribe());
      }
    )) 
  }

  otherUPI(event){
    this.onPayment(event, true);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroying payment,......');
    if(this.subscriptions)this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
