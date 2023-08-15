
export class Reward {
    pk:string;
    type:string;
    status:string;
    amount:string;
    created_at:Date;
    earned_for:String;
    reference_id?:string;
    cashgram_url?:string;
}

export class OfferDetail{
    title:string;
    image?:string;
    short_description:string;
    full_description:string;
    action?:string;
    expired_on?:Date;
    message?:string;
    action_title?:string;
    action_url?:string;
}