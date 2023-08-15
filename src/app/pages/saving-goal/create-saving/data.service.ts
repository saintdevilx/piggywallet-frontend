import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SavingGoal } from './model';

@Injectable({
    providedIn: 'root',
  })
export class SavingGoalFormDataService{
    //private messageSource = new BehaviorSubject();
    savingGoalFormData;
    formDataSource = new BehaviorSubject(new SavingGoal());
    formData = this.formDataSource.asObservable();
    constructor(){
        this.savingGoalFormData={};
    }

    setData(data){        
        this.formDataSource.next(data);
    }
    getData(){
        this.formDataSource.value;
    }
}