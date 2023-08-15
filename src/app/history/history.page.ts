import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { getGroupByTransaction } from '../utils/utils';
import { createFilterForm, HistoryFilter } from './filter.form';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage implements OnInit {

  historyResult:any;
  historyResultList:any;
  transactionSubscription:any;
  pageNumber:number=1;
  hasMoreData:boolean=true;
  nexPageUrl:boolean;
  filterEnabled:boolean=false;
  orderBy:string;
  transactionType:string;
  transactionTimeline:number;
  historyFilterForm:any;
  initialLoading=true;
  
  constructor(private transactionService:TransactionService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    const filterObj = new HistoryFilter({order_by:'latest', type:'', timeline:''});
    this.historyFilterForm = createFilterForm(this.formBuilder, filterObj);
    this.doRefresh(null);
  }

  doRefresh(event){  
    this.pageNumber=1;
    this.hasMoreData=true;
    this.loadMoreHistory(event);    
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.transactionSubscription)this.transactionSubscription.unsubscribe()
  }

  loadMoreHistory(event){    
    if(!this.hasMoreData){
      if(event)event.target.complete();
      return;
    }
    this.transactionSubscription = this.transactionService.getTransactionList(this.pageNumber, 10, this.historyFilterForm.value ).subscribe(
      data => {
        if(this.pageNumber === 1) this.historyResultList=data.results;
        else this.historyResultList = this.historyResultList.concat(data.results);
       
        this.hasMoreData = data.has_next;
        this.pageNumber = data.next_page_number;
        if(event)event.target.complete();
        this.initialLoading = false;
      },
      err => {
        if(event)event.target.complete();
        this.initialLoading = false;
      }
    )
  }

  toggleFilter(event){
    this.filterEnabled = !this.filterEnabled;
  }

  onFilterSubmit(event){
    this.hasMoreData=true;
    this.pageNumber=1;
    this.historyResultList=[];
    this.historyResult=[];
    this.loadMoreHistory(null);
  }
  
}
