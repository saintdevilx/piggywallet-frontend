import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RewardDataService } from '../reward-data.service';
import { Reward } from '../rewards.model';
import {ScratchCard, SCRATCH_TYPE} from 'scratchcard-js'
import { RewardService } from 'src/app/services/reward.service';
import { BankAccount } from '../../transaction/withdraw/withdraw.model';
import { createBankAccountForm } from '../../transaction/withdraw/bank-account.forms';
import { FormBuilder } from '@angular/forms';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { presentToast } from 'src/app/utils/utils';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GlobalConfigDataService } from 'src/app/services/global.config.data.service';

@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.page.html',
  styleUrls: ['./scratch.page.scss', '../rewards.page.scss'],
})
export class ScratchPage implements OnInit {

  rewardData:Reward;
  subscriptions = [] ;
  scratched=false;
  redeem=false;
  selectedAccount: string;
  options: { selectedAccount: any; enableBankAccountForm: boolean; };
  bankAccounts: any;
  redeemPending=false;
  completed=false;
  profileComplete=false;
  initialized = false;
  userData;
  openPending = false;
  sharePending=false;

  
  constructor(private rewardDataService:RewardDataService, private cd: ChangeDetectorRef, 
    private rewardApiService:RewardService, private browserTab:BrowserTab, private iab:InAppBrowser, 
    private authService:AuthenticationService, private globalConfig:GlobalConfigDataService ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.rewardDataService.dataSource.subscribe((res)=>{
        console.log('reward data', res);
        this.rewardData = res;
        if(res.status!='UNOPENED')this.initialized=true;
      })     
    )

    this.selectedAccount = 'EMPTY';
    this.options ={
      selectedAccount:null,
      enableBankAccountForm:false,
    }

    this.authService.currentUser.subscribe(user=>{
      this.userData = user;
      if(user.first_name && user.email && user.phone_number)this.profileComplete=true;
      this.cd.detectChanges();
    })

    this.globalConfig.dataSource.subscribe((data)=>{
      this.options['UPIEnabled'] = data.redeemUsingUPI;
    }, (err)=>{});    

  }

  openLink(link){
    this.browserTab.isAvailable()
    .then(isAvailable => {
      console.log('is available......');        
      if (isAvailable) {
        this.browserTab.openUrl(link);
      } else {
        this.iab.create(link, '_system','hideurlbar=yes,zoom=no,navigationbuttoncolor=#FFFFff,closebuttoncolor=#ffffff,toolbarcolor=#a657ff');
      }
    });     
  }

  redeemReward(event){
    //
    if(this.rewardData.cashgram_url){
      this.openLink(this.rewardData.cashgram_url);
    }
    else{
      this.redeem=true;
    }
  }

  redeemRewardTo(event){
    if(!this.rewardData.cashgram_url){
      if(!this.options.selectedAccount)return;
      let data = {
        'bank_id': this.options.selectedAccount.pk,      
      };
      this.redeemPending=true;
      this.subscriptions.push(
        this.rewardApiService.redeemReward(this.rewardData.pk, data).subscribe((res)=>{
          this.completed=true;
          this.rewardData.status = "PENDING";
        },(err)=>{
          presentToast('Error while redeeming reward');
        }, ()=>{
          this.redeemPending=false;
        })
      )
    }
    else{
      this.openLink(this.rewardData.cashgram_url);
    }
  }

  shareWithFriends(event){
    const message = `I just won reward on Mypiggywallet ! Save money and get exciting rewards on Mypiggywallet ! You can also win upto ₹100 Download now: `;
    const action = `https://play.google.com/store/apps/details?id=com.mpw.app&referral=referralCode%3D${this.userData.referral_code}`;
    console.log(`${message} ${action}`);
    this.sharePending=true;
    SocialSharing.share(message, "invite", 'www/assets/refer-share-wa.png', action).then(res=>{
      this.sharePending=false;
    }).catch(err=>{
      this.sharePending=false;
    });
  }


  ionViewDidEnter(){    
    if(this.profileComplete)this.prepareScracthCard();
  }

  prepareScracthCard(){
    let self = this;
    if(this.rewardData.status === "UNOPENED"){
      const scContainer = document.getElementById(`js--sc--container`)
      const sc = new ScratchCard(`#js--sc--container`, {
        scratchType: SCRATCH_TYPE.SPRAY,
        containerWidth: scContainer.offsetWidth,
        containerHeight: scContainer.offsetHeight,
        imageForwardSrc: 'assets/earned-reward.png',
        imageBackgroundSrc: '',
        clearZoneRadius: 80,
        nPoints: 30,
        pointSize: 20,
        callback: function () {
          if(self.scratched)return;
          self.scratched = true;
          self.openPending=true;
          scContainer.setAttribute('style','background:none');
          self.subscriptions.push(
            self.rewardApiService.openedScratchCard(self.rewardData.pk).subscribe(res=>{
              self.rewardData = res;
              self.openPending=false;
              self.cd.detectChanges();
            })
          );          
        }
      })
      
      // Init
      sc.init().then(() => {
        this.initialized=true;
        sc.canvas.addEventListener('scratch.move', () => {
          let percent = sc.getPercent().toFixed(2)
          if(percent>30){
            //this.scratched=true;
            //self.rewardData.status = 'Processing';
            //scContainer.setAttribute('style','background:none');
            self.cd.detectChanges();
          }
        })
      }).catch((error) => {

        console.log('error while initialising card ', error);      
      }); 
    }   
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((sub)=>sub.unsubscribe());
    this.rewardDataService.setData(null);
  }

}
