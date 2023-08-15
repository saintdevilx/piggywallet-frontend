import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RewardService } from 'src/app/services/reward.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { presentToast } from 'src/app/utils/utils';
import { OfferDetail } from 'src/app/pages/rewards/rewards.model';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {

  referralCode;
  referralDetail:OfferDetail;
  subscription;
  loadingDetails=null;
  enableDetails=false;
  invitePending=false;

  constructor(private authService:AuthenticationService, private rewardService:RewardService, 
    private clipboard: Clipboard) { }

  ngOnInit() {
    this.referralCode = this.authService.getcurrentUserValue().referral_code;
    this.subscription = this.rewardService.getOfferDetails('referral').subscribe(
      (res)=>{
      this.referralDetail = res;           

    },
    (error)=>{
      this.loadingDetails=false;
      console.log('error');
    });    

  }

  loadDetails(event){
    event.target.remove();
    this.enableDetails = true;
  }

  inviteShare(event){
    this.invitePending =true;
    SocialSharing.share(this.referralDetail.message, "invite", 'www/assets/refer-share-wa.png', this.referralDetail.action).then(res=>{
      this.invitePending = false;
    }).catch(err=>{
      presentToast('something went wrong can not share');
      this.invitePending=false;
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription)this.subscription.unsubscribe();
  }

  copyInviteLink(event){
    console.debug('copying ',this.referralDetail.action, 'to clipboard....');
    this.clipboard.copy(this.referralDetail.action);    
    presentToast("Copied to clipboard");
  }

}
