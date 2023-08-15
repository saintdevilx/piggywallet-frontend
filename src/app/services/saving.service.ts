import { ApiService } from './core/api.service';
import { Observable } from 'rxjs';
import { SavingGoal, SavingGoalModel, PaymentSubscription } from '../pages/saving-goal/create-saving/model';
import { map } from 'rxjs/operators';
import { PaginatedResult } from './core/base.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class SavingService {

    constructor(private apiService:ApiService){}

    getSavingGoalAll(page:number=1, pageSize:number=10, type:number=0): Observable<PaginatedResult<SavingGoalModel>>{
        console.log('getsving goall all', page, pageSize, type);
        return this.apiService.get(`saving/?page=${page}&page_size=${pageSize}&status=${type}`);
    }

    getAutoDebitAuthorisationLink(pk:string): Observable<PaymentSubscription> {
        return this.apiService.get(`payment/subscription/${pk}/`);
    }    

    getSavingGoal(pk:string): Observable<SavingGoalModel>{
        return this.apiService.get(`saving/${pk}/`);
    }    

    createSavingGoal(savingGoal:SavingGoal, pk:string=undefined): Observable<SavingGoalModel>{
        let REQUEST_URL = !pk ? `saving/` : `saving/${pk}/`;
        return this.apiService.post(REQUEST_URL, savingGoal);
    }

    closeSavingGoal(pk:string): Observable<SavingGoalModel>{
        return this.apiService.delete(`saving/${pk}/`);
    }

    depositPayment(savingGoal:SavingGoalModel): Observable<SavingGoalModel>{
        return this.apiService.post(`saving/${savingGoal.pk}/deposit/`,savingGoal);
    }    
}