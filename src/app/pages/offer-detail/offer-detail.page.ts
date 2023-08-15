import { Component, OnInit } from '@angular/core';
import { OfferDetailDataService } from './offer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.page.html',
  styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {

  subscription;
  offerDetail;

  constructor(private offerService:OfferDetailDataService, private route:Router) { }

  ngOnInit() {
    this.subscription = this.offerService.dataSource.subscribe((data)=>{
      this.offerDetail = data;
    })
  }

  gotoOffer(event){
    if(this.offerDetail){
      console.log(this.offerDetail);
      this.route.navigate([this.offerDetail.action_url], {'replaceUrl': true});
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription)this.subscription.unsubscribe();
  }
}
