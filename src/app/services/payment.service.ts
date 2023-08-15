import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { Withdraw } from '../pages/transaction/withdraw/withdraw.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService:ApiService) { }

  withdrawRequest(withdrawInstance:Withdraw){
    return this.apiService.post('payment/', withdrawInstance);
  }

  checkPaymentStatus(data){
    return this.apiService.raw_post('https://securegw.paytm.in/order/status', data);
  }

  syncPaymentStatus(pk){
    return this.apiService.get(`saving/transaction/${pk}/`);
  }

}
