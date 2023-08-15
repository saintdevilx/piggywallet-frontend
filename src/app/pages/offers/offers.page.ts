import { Component, OnInit } from '@angular/core';
import { RewardService } from '../../services/reward.service';
import { OfferDetail } from 'src/app/pages/rewards/rewards.model';
import { Subscription } from 'rxjs';
import { OfferDetailDataService } from '../offer-detail/offer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offersList:Array<OfferDetail>=[];
  subscriptions:Array<Subscription>=[];
  page = 1;
  hasNext=true;
  pending=false;
  constructor(private offerService:RewardService, 
    private offerDataService:OfferDetailDataService, private route:Router) { }

  ngOnInit() {
    this.loadOffers(null);
  }

  onRefresh(event){
    this.page = 1;
    this.hasNext = true;
    this.offersList=[];
    this.loadOffers(event);
  }

  viewOffer(event, offer){
    this.offerDataService.setData(offer);
    this.route.navigate(['/offer-detail'], {replaceUrl: true});
  }

  loadOffers(event){
    if(this.pending)return;
    this.pending=true;
    this.subscriptions.push(
      this.offerService.getOffers(this.page).subscribe((res)=>{
        this.offersList = this.offersList.concat(res.results);
        console.log(this.offersList);
        this.page = res.next_page_number;
        this.hasNext = res.has_next;
        this.pending=false;
        if(event)event.target.complete();
      })
    );    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
