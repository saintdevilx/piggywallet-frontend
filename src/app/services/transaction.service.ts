import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { Observable } from 'rxjs';
import { Transaction } from '../pages/transaction/models/transaction.model';
import { PaginatedResult } from './core/base.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private apiService:ApiService) { }

  getAll(pk:string, page:number=1, pageSize:number=10): Observable<PaginatedResult<Transaction>>{
    return this.apiService.get(`saving/${pk}/transactions/?page=${page}&page_size=${pageSize}`);
  }

  getTransactionList(page:number=1, pageSize:number=10, data:any={}){
    return this.apiService.get(`saving/transactions/?page=${page}&page_size=${pageSize}`, data);
  }

  // depositPayment(): Observable<Transaction>{
  //   return this.apiService.post('');
  // }

  webhookCallback(pk:string, status:string): Observable<Transaction>{
    return this.apiService.post(`saving/transaction/callback_webhook`, {"pk":pk, status:status});
  }

}
