import { Injectable } from '@angular/core';
import { Transaction } from '../transaction/models/transaction.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  transactionData:Transaction;
  dataSource = new BehaviorSubject(new Transaction());
  data = this.dataSource.asObservable();  
  constructor() { }

  setData(data){
    this.dataSource.next(data);
  }

  getData(){
    return this.dataSource.value;
  }

}
