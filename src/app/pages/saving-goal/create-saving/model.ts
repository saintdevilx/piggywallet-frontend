import { BaseModel } from 'src/app/services/core/base.model';
import { AspirationModel } from '../../aspiration/aspiration-detail/aspiration.model';
import { addDaysToDate } from 'src/app/utils/utils';

export enum DeductionType {
    AutoDebit,
    Manual
}

export class SavingGoal{
    pk?:string;
    title: string= '';
    target_amount:number=null;
    target_date: Date = null;
    deposit_frequency:string="1";
    deduction_amount:number=0;
    deduction_mode:string="AUTO DEBIT";
    time_left?:any;
    submitted?:boolean=false;

    setData(aspiration){
        this.title = aspiration.title;
        this.target_amount = aspiration.target_amount;
        if(aspiration.target_date) this.target_date = aspiration.target_date;
        else if(aspiration.target_days)this.target_date = addDaysToDate(new Date(), aspiration.target_days);
    }
}

export class User {
    first_name:string;
    last_name:string;
    phone_number:string;
    email:string;
    username:string;
    pk:string;
    image?:string;
    token?:string;
    current_deposit?:number;
    achieved_goal?:number;
    in_progress_goal?:number;
    email_verified?:boolean;
    kyc_completed?:boolean;
    referral_code?:string;
    referral_link?:string;
    rewards?:number;
    reward_count?:number;

    getFullName(){
        return `${this.first_name} ${this.last_name}`;
    }
}

export class SavingGoalModel extends BaseModel {
    pk:string;
    title:string;
    target_amount:number;
    current_amount:number;
    target_date:Date;
    user?:User;
    status:string;
    created_at:string;
    deduction_amount:number;
    deduction_mode:any;
    deposit_frequency:any;
    time_left:number;
    lastDeposited:string;    
    payment_subscription:string;
    
    getDespositFrequency(){
        return this.deposit_frequency === 7 ? 'weekly' : (this.deposit_frequency=== 30 ? 'monthly' : 'daily');
    }

    getDeductionMode(){
        return this.deduction_mode === 1 ? "AUTO DEBIT" : 0 ;
    }

    setData(aspiration){
        this.title = aspiration.title;
        this.target_amount = aspiration.target_amount;
        if(aspiration.target_date) this.target_date = aspiration.target_date;
        else if(aspiration.target_days)this.target_date = addDaysToDate(new Date(), aspiration.target_days);
    }

}

export class PaymentSubscription{
    status:boolean;
    reference_id:string;
    subscription_id:string;
    saving_goal_id?:string;
    auth_link:string;
    enabled?:boolean;
    message?:string;
}