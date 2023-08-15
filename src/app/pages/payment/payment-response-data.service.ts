import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentResponse } from './payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentResponseDataService {  
  dataSource = new BehaviorSubject(new PaymentResponse());
  data = this.dataSource.asObservable()
  constructor() { }

  setData(data){
    this.dataSource.next(data);
  }
  getData(){
    return this.data;
  }
  
}
