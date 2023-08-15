import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createBankAccountForm, createWithdrawForm } from './bank-account.forms';
import { SavingGoalDataService } from 'src/app/pages/saving-goal/saving-goal-data.service';
import { SavingGoalModel } from '../../saving-goal/create-saving/model';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { Withdraw, BankAccount } from './withdraw.model';
import { PaymentService } from '../../../services/payment.service';
import { Router } from '@angular/router';
import { presentToast, formatDecimalNumber } from 'src/app/utils/utils';
import { error } from 'protractor';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  bankAccountInstance:BankAccount;
  bankAccountForm:any;
  savingGoal:SavingGoalModel;
  dataSubscription:any;
  withdrawl_amount:number;
  bankAccounts:Array<BankAccount>;
  enableBankAccountForm:boolean=false;
  selectedAccount:string=null;
  enableReviewDetail:boolean=false;
  options:any;
  withdrawInstance:Withdraw;
  withdrawRequestPending:boolean=false;
  error;
 

  subscriptions:Array<any>;

  constructor( private savingDataService:SavingGoalDataService,
    private paymentService:PaymentService, 
    private router:Router) { }

  ngOnInit() {

    this.selectedAccount = 'EMPTY';
    this.options ={
      selectedAccount:null,
      enableBankAccountForm:false,
    }

    this.savingDataService.dataSource.subscribe(
      data =>{
        this.savingGoal = data;
        console.log(data);
      }
    )

  }



  setReviewDetail(event){
    console.log(this.options, 'options....', !this.options , !this.options.selectedAccount , (!this.options.selectedAccount.upi_vpa && !this.options.selectedAccount.account_no) ,!this.savingGoal , !this.savingGoal.pk , !this.withdrawl_amount);
    if(!this.options || !this.options.selectedAccount || (!this.options.selectedAccount.upi_vpa && !this.options.selectedAccount.account_no) || !this.savingGoal || !this.savingGoal.pk || !this.withdrawl_amount) return;
    this.enableReviewDetail=true;
    this.withdrawInstance = new Withdraw({}).init({
      'user_bank_account':this.options.selectedAccount.pk,
      'saving_goal':this.savingGoal.pk, 'withdraw_amount':this.withdrawl_amount
    });  
  }

  checkValidAmount(event){
    //if(Number(event.target.value) > this.savingGoal.current_amount) this. = this.savingGoal.current_amount;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.dataSubscription)this.dataSubscription.unsubscribe();
  }

  sendWithdrawRequest(event){
    if(this.withdrawRequestPending)return;
    this.withdrawRequestPending = true;    
    this.paymentService.withdrawRequest(this.withdrawInstance).subscribe(data=>{
      this.router.navigate(['/saving-detail']);
      presentToast('withdraw request places successfully !!');
    },
    error=>{
      console.log(error)
      this.withdrawRequestPending = false;
      this.error = error.error;
      presentToast(error.error.message||'something went wrong....');
    })
  }

}
