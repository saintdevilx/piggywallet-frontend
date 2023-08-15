import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SavingGoal, SavingGoalModel, PaymentSubscription } from '../../saving-goal/create-saving/model';
import { SavingService } from '../../../services/saving.service';
import * as moment from 'moment'; 
import { getDateDiffrence, compareDate, getGroupByTransaction, presentAlert } from 'src/app/utils/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { SavingGoalDataService } from '../saving-goal-data.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { PopoverController, AlertController, ToastController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { SavingGoalFormDataService } from '../create-saving/data.service';
import { SubscriptionService } from '../../payment/subscription/subscription.service';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { Transaction } from '../../transaction/models/transaction.model';
import { GlobalConfigDataService } from '../../../services/global.config.data.service';


@Component({
  selector: 'app-saving-detail',
  templateUrl: './saving-detail.page.html',
  styleUrls: ['./saving-detail.page.scss'],
})
export class SavingDetailPage implements OnInit {

  savingGoal:SavingGoalModel= new SavingGoalModel({});
  transactions:any;
  timeLeft:any;
  dataSubscription:any;
  transactionSubscription:any;
  pagingDisabled:boolean=false;
  page=1;
  pageSize=10;
  hasMoreData = false;
  popover:any;
  savingServiceSubscription:any;
  completedPercentage:number=0;
  subscription:Array<any>;
  paymentSubscription:PaymentSubscription;
  settings;
  subscriptions = [];

  constructor( private savingDataService:SavingGoalDataService, 
    private savingService:SavingService,
    private transactionService:TransactionService,
    private formDataService:SavingGoalFormDataService, private route:Router, 
    private popoverCtrl:PopoverController,
    public toastController: ToastController, private globalSettingsService:GlobalConfigDataService, private cd:ChangeDetectorRef) { }
  
    
  ngOnInit() {     
    this.subscriptions.push(this.globalSettingsService.dataSource.subscribe((set)=>{
      this.settings = set;
    })  )
  }

  ionViewWillEnter(){
    this.doRefreshTransaction(null);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }


  getcompletedPercentage(){
    return (this.savingGoal.current_amount/this.savingGoal.target_amount)
  }

  stringify(obj){
    return JSON.stringify(obj);
  }

  doRefreshTransaction(event){
    if(this.dataSubscription)this.dataSubscription.unsubscribe();
    this.dataSubscription = this.savingDataService.dataSource.subscribe(data=>{
      this.savingGoal = new SavingGoalModel(data);     
      console.log(this.savingGoal, data); 
      this.getcompletedPercentage();
      if(event){
        this.dataSubscription =  this.savingService.getSavingGoal(data.pk).subscribe(
          data => {
            this.savingGoal = new SavingGoalModel(data);
            this.getcompletedPercentage();
          },
          err => this.presentToast('can not refresh saving details')
        )
      }
      if(this.transactionSubscription)this.transactionSubscription.unsubscribe();
      this.transactionSubscription = this.transactionService.getAll(this.savingGoal.pk).subscribe(
        data => {
          this.transactions= data.results;
          this.hasMoreData = data.has_next;
          console.log(this.transactions);
          if(event)event.target.complete();
        },
        err => {
          if(event)event.target.complete();
        }
      )                  
    });
  }

  allowAutoDebit(event){
    this.route.navigate(['/subscription']);
    //else     presentAlert("Sorry currenttly we are facing some problems. we will inform you once problem is resolved.");
  }

  withdraw(){
    if(this.popover)this.popover.dismiss();
    this.route.navigate(['/withdraw']);
  }

  deposit(){
    this.formDataService.setData(this.savingGoal);
    this.route.navigate(['/payment']);
  }

  async presentToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();   
  }  

  closeSavingGoal(){
    this.savingServiceSubscription = this.savingService.closeSavingGoal(this.savingGoal.pk).subscribe(
      data => {        
        this.presentToast('Saving Closed successfully !');
        this.route.navigate(['/tabs/home']);
      },
      err => {
        this.presentToast('Error while closing Saving !!');
      }
    )    
  }

  typeofObj(obj){
    return typeof(obj);

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.transactionSubscription)this.transactionSubscription.unsubscribe();
    if(this.dataSubscription)this.dataSubscription.unsubscribe();
    this.subscriptions.forEach(sub=>sub.unsubscribe());
    console.log('detroyed.....');
  }

  loadMoreTransaction(infiniteScroll){
    console.log('loadMoreTransaction....................');
    if(this.pagingDisabled)  return;
    this.page += 1;
    this.pagingDisabled = true;
    this.transactionService.getAll(this.savingGoal.pk, this.page, this.pageSize).subscribe(data => {
      this.transactions = this.transactions.concat(data.results);
      console.log(this.transactions.length,'=====>>>>>>');
      this.pagingDisabled = !(data.results);
      this.hasMoreData = data.has_next;       
      if(infiniteScroll)infiniteScroll.target.complete();

      if(this.pagingDisabled){
        infiniteScroll.target.disabled = true;;
        this.hasMoreData = false;
      }
    });
  }

  async moreOptions(ev: any) {
    this.popover = await this.popoverCtrl.create({
        component: PopoverComponent,
        event: ev,
        animated: true,
        showBackdrop: false,
        componentProps:{savingGoal:this.savingGoal, parentRef:this}
    });
    return await this.popover.present({ ev: ev, event: ev});
  }    

}
