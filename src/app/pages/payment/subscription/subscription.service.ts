import { Injectable } from '@angular/core';
import { PaymentSubscription } from '../../saving-goal/create-saving/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  paymentSubscription:PaymentSubscription;
  dataSource = new BehaviorSubject(new PaymentSubscription());
  data = this.dataSource.asObservable();  
  constructor() { }

  setData(data){
    this.dataSource.next(data);
  }

  getData(){
    return this.dataSource.value;
  }
}
