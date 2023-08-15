import { Component, OnInit } from '@angular/core';
import { SavingService } from '../../../services/saving.service';
import { SavingGoalModel } from '../create-saving/model';
import { SavingGoalDataService } from '../saving-goal-data.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-saving-list',
  templateUrl: './saving-list.page.html',
  styleUrls: ['./saving-list.page.scss'],
})
export class SavingListPage implements OnInit {

  savingSubscription:any;
  savingList:any=null;
  page:number=1;
  hasNext:boolean=true;
  SavingType = {
    IN_PROGRESS: 0,
    COMPLETED: 1,
    CANCELLED: 2,
    WITHDRAW: 3
  }  
  savingType:number= this.SavingType.IN_PROGRESS;
  initialLoading=true;
  subscription;

  constructor(private savingService:SavingService, private savingDataService:SavingGoalDataService, 
    private router:Router) { 

    }

  ngOnInit() {
    this.subscription = this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        const state = this.router.getCurrentNavigation().extras.state;
        console.debug('state.....___',state);
        this.savingType = ( state && state.section === "achieved")? this.SavingType.COMPLETED : this.SavingType.IN_PROGRESS ;
        console.debug(this.savingType, 'saving type.......')
        this.loadMoreSavings(null);
      }
    })    
  }
  
  doRefresh(event){
    this.page=1;
    this.hasNext=true;
    this.loadMoreSavings(event);
  }

  savingGoalDetail(savingGoalItem:SavingGoalModel){
    this.savingDataService.setData(savingGoalItem);
    this.router.navigate(['saving-detail']);
  }

  segmentChanged(event){
    console.log(event.detail.value);
    this.page = 1;
    this.savingList = null;
    this.initialLoading=true;
    this.savingType = event.detail.value;
    this.doRefresh(null);
  }

  loadMoreSavings(event){
    if(!this.hasNext){
      if(event)event.target.complete();
      return;
    }
    console.log(this.page, this.savingType);
    this.savingSubscription = this.savingService.getSavingGoalAll(this.page, 10, this.savingType).subscribe(
      data => {
        if(this.page === 1)this.savingList=data.results;
        else this.savingList = this.savingList.concat(data.results);        
        console.debug(data, this.savingList);
        if(event)event.target.complete();
        this.page = data.next_page_number || this.page + 1;
        this.hasNext = data.has_next;
        this.initialLoading=false;
      },
      error => {
        console.log('error while savingservice');
        if(event)event.target.complete();
        this.initialLoading=false;
      }
    )    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.savingSubscription)this.savingSubscription.unsubscribe()
    if(this.subscription)this.subscription.unsubscribe();
  }

  openSavingDetail(saving){
    this.savingDataService.setData(saving);
    this.router.navigate(['/saving-detail'])
  }

}
