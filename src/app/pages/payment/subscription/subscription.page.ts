import { Component, OnInit } from '@angular/core';
import { SavingGoalDataService } from '../../saving-goal/saving-goal-data.service';
import { SavingGoalModel, PaymentSubscription } from '../../saving-goal/create-saving/model';
import { SavingService } from 'src/app/services/saving.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { presentToast, presentAlert } from 'src/app/utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  savingGoal:SavingGoalModel;
  paymentSubscription:PaymentSubscription;
  subscriptions:Array<Subscription>=[];

  constructor(private savingDataService:SavingGoalDataService, private savingService:SavingService,
    private toastController:ToastController, private _router:Router, private navCtrl: NavController) { }

  ngOnInit() {
    console.log('initialising..... subscription.....');
    this.subscriptions.push(this.savingDataService.dataSource.subscribe(data=>{
      this.savingGoal = new SavingGoalModel(data);  
      this.openSubscriptionPopUp();
    }))
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroying.... subscription....');
    if(this.subscriptions)this.subscriptions.forEach(item=>item.unsubscribe());
  }

  onCallback(event){
    console.log('subscription data.........', event, event.data);
  }
  
  openSubscriptionPopUp(){
    this.subscriptions.push(this.savingService.getAutoDebitAuthorisationLink(this.savingGoal.pk).subscribe(data=>{
        this.paymentSubscription = data;
        if(this.subscriptions)this.subscriptions.forEach(item=>item.unsubscribe());
        if(!data.enabled){
          presentAlert(data.message||'Sorry Auto debit option is not working. our team is working on it , we will inform you once it start working.');
          this.navCtrl.back();
        }
        else{
          window['subscriptionCallback'] = window['subscriptionCallback'] || {};
          window['subscriptionCallback'] = this.onCallback.bind(this);
          const self =this;
          setTimeout(function(){
            window.addEventListener('message', receiveMessage, false);
            function receiveMessage(event) {
              const data =  event.data;
              self._router.navigate(['/saving-detail']);
              try{
                const js_data = JSON.parse(data);
                if(js_data.status === 'ACTIVE')presentToast('Subcription authorised successfully !!');
              }catch(e){
                presentToast('something wen wrong. Please try again.');
              }
            }        
            document.getElementById('autodebit-authorise-popup-iframe').setAttribute('src',data.auth_link);
          },200);
        }
      },
      err=>{
        this.presentToast("Something went wrong please try aftter try sometime.");
      })
    )   
  }
  async presentToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();   
  }  
}
