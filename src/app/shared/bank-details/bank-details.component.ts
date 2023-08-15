import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccountService, BankInfo } from 'src/app/services/bank-account.service';
import { BankAccount } from 'src/app/pages/transaction/withdraw/withdraw.model';
import { presentToast } from 'src/app/utils/utils';
import { FormBuilder } from '@angular/forms';
import { createBankAccountForm } from 'src/app/pages/transaction/withdraw/bank-account.forms';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent implements OnInit {
  
  //@Input() BankAccountForm:any; 
  //@Input() bankAccounts:Array<BankAccount>; 
  @Input() options;
  //@Output('submit') submit =  new EventEmitter();

  account_type = null;
  ifscPending:boolean=false;
  bankDetail:BankInfo;
  bankAccountInstance: BankAccount;
  bankAccountForm: any;
  bankAccounts: any;
  enableBankAccountForm: boolean;

  constructor(private formbuilder:FormBuilder, private bankAccountService:BankAccountService,  ) { }

  ngOnInit() {
    this.bankAccountInstance = new BankAccount({})
    this.bankAccountForm = createBankAccountForm(this.formbuilder, this.bankAccountInstance);    
    this.bankAccountService.getUserBankAccounts().subscribe(data=>{
      if(this.options.hasOwnProperty('UPIEnabled') && !this.options.UPIEnabled){
        this.bankAccounts = data.filter((bank)=> !bank.upi_vpa);
      }
      else this.bankAccounts = data||[];
      console.log(this.bankAccounts);
    },
    error=>{

    })    
  }

  onSubmitForm(event){   
    if(this.bankAccountForm.value.isSubmitted)return;
    this.bankAccountForm.value.isSubmitted = true;
    console.log(this.bankAccountForm, this.bankAccountForm.value);
    this.bankAccountService.addBankAccount(this.bankAccountForm.value).subscribe(
      data=>{
        this.bankAccountForm.value.isSubmitted = false;
        this.bankAccounts.push(data);
        console.log(data, this.bankAccounts, 'bankaccounts list;....');
        this.enableBankAccountForm=false;
        this.options.enableBankAccountForm = false;
        
      },
      error=>{
        this.bankAccountForm.value.isSubmitted = false;
        presentToast('Can not not add bank detail. Please check your details and try again.');
      }
    )
  }

  
  onSubmit(event){
    this.onSubmitForm(event);
  }

  getSelectedAccountDetail(pk){
    let selected = this.bankAccounts ? this.bankAccounts.filter(data=>data.pk==pk) : null;
    return selected?selected[0]:null;
  }

  selectBankAccount(event){
   this.options.selectedAccount = this.getSelectedAccountDetail(event.target.value); 
  }

  addBankAccount(event){
    this.options.enableBankAccountForm = true;    
  }
  cancelBankAccountForm(event){
    this.options.enableBankAccountForm = false;
    this.bankAccountForm.reset();
  }

  changeAccountType(event){
    this.account_type = event.target.value;
  }

  getIFSCDetails(event){    
    if(event.target.value.trim().length < 11) return;
    this.ifscPending=true;    
    this.bankAccountService.getBankDetailsFromIFSC(event.target.value).then(
      response=>{
        response.json().then(data=>{
          this.bankDetail=data;         
        })
        this.ifscPending=false;          
      }).catch(error=>{
        this.ifscPending=false;
        presentToast('IFSC code coud not be resolved. Please check an try again.');
      }
    )
  }

}
