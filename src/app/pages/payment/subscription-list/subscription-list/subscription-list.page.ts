import { Component, OnInit } from '@angular/core';
import { SubscriptionAPIService } from 'src/app/services/subscription.api.service';
import { AlertController } from '@ionic/angular';
import { presentToast } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { SavingGoalDataService } from 'src/app/pages/saving-goal/saving-goal-data.service';


@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.page.html',
  styleUrls: ['./subscription-list.page.scss'],
})
export class SubscriptionListPage implements OnInit {

  page=1;
  hasMore = true;
  subscriptions:any= null;

  constructor(private subscriptionService:SubscriptionAPIService, private alertCtrl:AlertController, 
    private route:Router, private savingGoalDataService:SavingGoalDataService) { }

  ngOnInit() {
    this.doRefresh(null);
  }

  doRefresh(event){
    this.page=1;
    this.hasMore=true;
    this.subscriptions=[];
    this.loadMoreData(event);
  }

  loadMoreData(event){
    if(!this.hasMore)return;
    this.subscriptionService.getSubscriptions(this.page).subscribe(data=>{
      this.subscriptions = this.subscriptions.concat(data.results);
      this.hasMore = data.has_next;
      this.page = data.next_page_number;
      if(event)event.target.complete();
    })
  }

  async cancelSubscription(event, pk){
    let alert = this.alertCtrl.create({
      header: 'Cancel Auto Debit',
      message: 'This will cancel the auto debit and can not be restored. are you still want to cancel ?',
      buttons:[
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.cancelSubscriptionUpdate(event, pk)
          }
        }
      ]
    });       
    (await alert).present();    
  }

  cancelSubscriptionUpdate(event, pk){
    event.target.parentElement.parentElement.setAttribute('disabled','true');
    this.subscriptionService.cancelSubscription(pk).subscribe(data=>{
      event.target.parentElement.parentElement.removeAttribute('disabled');
    },error=>{
      presentToast('Something went wrong. Please try again later');
    })
  }

  gotoSavingGoal(event, goal){
    this.savingGoalDataService.setData(goal);
    this.route.navigate(['/saving-detail']);
  }

}
