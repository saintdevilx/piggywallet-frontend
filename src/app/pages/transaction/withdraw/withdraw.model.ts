import { BaseModel } from 'src/app/services/core/base.model';

export class Withdraw extends BaseModel{
    isSubmitted:boolean=false;
    account_no:number=null;
    user_bank_account:string=null;
    withdraw_amount:number=null;    
    saving_goal_id:string=null;
}

export class BankAccount extends BaseModel{
    pk?:string;
    bank_name:string=null;
    account_holder_name:string=null;
    account_no:string=null;
    bank_logo?:string=null;
    ifsc_code?:string=null;
    isSubmitted?:boolean=false;
    upi_vpa?:string=null;
}