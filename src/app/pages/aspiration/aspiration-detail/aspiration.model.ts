import { BaseModel } from "src/app/services/core/base.model";

export class AspirationModel extends BaseModel{
    pk:string;
    title:string;
    description:string;
    short_description:string;
    icon_image:string;
    image:string;
    target_date?:Date;
    target_days?:number;
    target_amount?:number;
    follower?:number;
    appreciation?:number;
    completed?:number;
    in_progress?:number;    
}