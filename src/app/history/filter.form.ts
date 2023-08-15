import { FormBuilder } from '@angular/forms';
import { BaseModel } from 'src/app/services/core/base.model';

export class HistoryFilter extends BaseModel {
    order_by:string;
    timeline:number;
    type:string;
}

export function createFilterForm(formBuilder:FormBuilder, historyFilter:HistoryFilter){
    return formBuilder.group(historyFilter);
}