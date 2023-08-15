import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RegisterUserDetail } from './forms';

@Injectable({
    providedIn: 'root',
  })
export class RegisterationFormDataService{
    formData;
    formDataSource = new BehaviorSubject(new RegisterUserDetail());
    formDataObservable = this.formDataSource.asObservable();
    constructor(){
        this.formData={};
    }

    setData(data){        
        this.formDataSource.next(data);
    }
    // getData(){
    //     this.formDataSource.subscribe(data=>);
    // }
}