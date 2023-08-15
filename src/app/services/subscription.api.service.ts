import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { Observable, Subscription } from 'rxjs';
import { PaginatedResult } from './core/base.model';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionAPIService {

  constructor(private apiServie:ApiService) { }

  getSubscriptions(page=1, page_size=10): Observable<PaginatedResult<Subscription>>{
    return this.apiServie.get(`payment/subscriptions/?page=${page}&page_size=${page_size}`);
  }

  cancelSubscription(subscription_id){
    return this.apiServie.post(`payment/subscription/${subscription_id}/`);
  }

}
