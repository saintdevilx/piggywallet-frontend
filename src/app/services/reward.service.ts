import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { PaginatedResult } from './core/base.model';
import { Observable } from 'rxjs';
import {Reward, OfferDetail} from '../pages/rewards/rewards.model';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private apiService:ApiService) { }

  getRewards(page=1, type=null): Observable<PaginatedResult<Reward>>{
    return this.apiService.get(`rewards?page=${page}&type=${type}`);
  }

  getOffers(page=1, type=null): Observable<PaginatedResult<OfferDetail>>{
    return this.apiService.get(`rewards/offers?page=${page}&type=${type}`);
  }

  getOfferDetails(offer_id): Observable<OfferDetail>{
    return this.apiService.get(`rewards/offer_details/${offer_id}`)
  }

  openedScratchCard(reward_id){
    return this.apiService.post(`rewards/${reward_id}/opened`);
  }

  redeemReward(reward_id, data){
    return this.apiService.post(`rewards/${reward_id}/redeem`, data)
  }

}
