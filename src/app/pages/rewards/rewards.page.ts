import { Component, OnInit } from '@angular/core';
import { RewardService } from 'src/app/services/reward.service';
import { Router } from '@angular/router';
import { RewardDataService } from './reward-data.service';
import { presentAlert } from 'src/app/utils/utils';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  subscriptions=[];
  page = 1;
  hasNext = true;
  rewards = [];
  offerDetail;
  pending=false;

  constructor(private rewardApi:RewardService, private router:Router, 
    private rewardDataService:RewardDataService) { }

  ngOnInit() {
    this.loadMoreRewards(null);
  }

  onReferesh(event){
    this.page = 1;
    this.hasNext = true;
    this.loadMoreRewards(event);
  }

  openScratchCard(event, reward){
    this.rewardDataService.setData(reward);
    this.router.navigate(['/scratch'], {replaceUrl: true});
  }

  loadMoreRewards(event){
    if(!this.hasNext){
      if(event)event.target.complete();
      return;
    }
    this.pending = true;
    this.subscriptions.push(
      this.rewardApi.getRewards(this.page).subscribe((res)=>{
        if(event)event.target.complete();
        if(this.page==1) this.rewards = res.results;
        else this.rewards.concat(res.results);
        this.hasNext = res.has_next;
        this.page = res.next_page_number;

      },(err)=>{
        presentAlert("Oops something went wrong. ");
      }, ()=>{
        this.pending =false;
      })
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


}
