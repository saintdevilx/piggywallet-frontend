import { User } from '../../saving-goal/create-saving/model';

export class Transaction {
    pk?:any;
    amount:number;
    amount_before:number;
    amount_after:number;
    type:string;
    status:string;
    data:string;
    extra_data:string;
    user?:User;
    html_form?:any;
    order_id?:any;
    ref_id?:any;
    created_at?:any;
    saving_goal?:any;
}