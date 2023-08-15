import { Component, OnInit } from '@angular/core';
import { SavingService } from '../services/saving.service';
import { SavingGoal, SavingGoalModel } from '../pages/saving-goal/create-saving/model';
import { Router } from '@angular/router';
import { SavingGoalDataService } from '../pages/saving-goal/saving-goal-data.service';
import { AuthenticationService } from '../services/auth.service';
import { AspirationModel } from '../pages/aspiration/aspiration-detail/aspiration.model';
import { AspirationService } from '../services/aspiration.service';
import { Subscription } from 'rxjs';
import { AspirationDataService } from '../pages/aspiration/aspiration-data.service';
import { Platform } from '@ionic/angular';
import { BlogService, BlogPost } from '../services/blog.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InProgressSavingService } from '../services/inprogress.saving.service';
import { CurrentUserDataService } from '../services/current-user.data.service';
import { GlobalConfigDataService } from '../services/global.config.data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  savingGoals:any = null;
  userDetail:any;
  savingPage:number=1;
  savingHasNext:boolean=true;
  slideOpts = {slidesPerView:2.25};
  slideOpts2 = {slidesPerView:1.75};
  layoutView={'type':'squared'};
  aspirations:Array<AspirationModel> = null;
  subscriptions:Array<Subscription>= [];
  permissions_list:any;
  permissions:any;
  blogPosts=[];
  kycRequired:boolean=false;
  settings;

  constructor(private savingService:SavingService, private route:Router, 
    private savingDataService:SavingGoalDataService, private authService:AuthenticationService,
    private aspirationService:AspirationService, private aspirationDataService:AspirationDataService, 
    private blogService:BlogService, private iab:InAppBrowser, 
    private browserTab:BrowserTab, private ingprogessSaving:InProgressSavingService, 
    private currentUser:CurrentUserDataService, private globalConfigService:GlobalConfigDataService) {

      this.blogService.getPostsList().then(response=>{
          response.json().then(json_data=>{
            json_data.map(data=>{
              this.blogPosts.push(Object.assign(new BlogPost(), data));
            });
          }).catch(err=>{
            console.log('error while parsing json', err);
          });
      }).catch(error=>{console.log('erro while fetching posts data');})

      this.subscriptions.push(
        this.globalConfigService.dataSource.subscribe((data)=>{
          this.settings = data;
        })
      );

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
  
  gotoSavingGoalLis(event, section){
    this.route.navigate(['/saving-list'],{state:{'section':section}})
  }

  viewAllBlogs(event){
    this.openLink('https://www.mypiggywallet.com/blog?utm_source=app&utm_medium=app');
  }
  

  ngOnInit(): void {
    this.subscriptions.push(this.currentUser.dataSource.subscribe(userDetail=>{
      console.log(`user detail: ${this.userDetail} ${!userDetail}`);
      if(this.userDetail && !userDetail)return;
      this.userDetail = userDetail;
      if(!this.userDetail.kyc_completed)this.kycRequired=true;            
      //if(this.subscriptions)this.subscriptions.forEach(item=>item.unsubscribe());
    }))
    this.subscriptions.push(this.ingprogessSaving.savingGoals.subscribe(data=>{
      this.savingGoals = data.results;        
      this.savingHasNext = data.hasNext;    
      //if(this.subscriptions)this.subscriptions.forEach(item=>item.unsubscribe());
    }))
    this.getAspirationList();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //console.log('syncing......');
    //this.authService.syncUserDetail();
  }

  savingGoalDetail(savingGoalItem:SavingGoalModel){
    this.savingDataService.setData(savingGoalItem);
    this.route.navigate(['saving-detail']);
  }

  onChangeLayoutView(event, layout){
    console.log(event);
    this.layoutView['type'] = layout;
    localStorage.setItem('layoutView', JSON.stringify(this.layoutView));
    console.log(layout);
  }


  doRefresh(event){
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
    this.subscriptions.push(this.authService.syncUserDetail().subscribe(
      data=> {
          console.log('synced successfully !');
          this.userDetail = data;          
      }, 
      error=>{
          console.log('invalid user detail');
      }
    )); 
    this.subscriptions.push(this.savingService.getSavingGoalAll(undefined, 5).subscribe(
      data=> {
        this.savingGoals = data.results;        
        this.savingHasNext = data.has_next;
        if(event)event.target.complete();
      },
      err=>{
        console.log("error occurred: ",err);
        if(event)event.target.complete();
      }
    ));       
    this.getAspirationList();

  }

  getAspirationList(){
    this.subscriptions.push(this.aspirationService.getList(1, 5).subscribe(data =>{
      this.aspirations = data.results;
    })) 
  }

  viewAspirationDetail(aspiration){
    this.aspirationDataService.setData(aspiration)
    this.route.navigate(['/aspiration-detail']);
  }  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('home destroy...');
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


}
