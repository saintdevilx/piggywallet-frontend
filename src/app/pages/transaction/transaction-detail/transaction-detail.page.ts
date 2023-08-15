import { Component, OnInit } from '@angular/core';
import { DataService } from '../../payment/data.service';
import { Transaction } from '../models/transaction.model';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {

  subscription:any;
  transaction:Transaction;
  pending:boolean=false;
  timeout = 5; // 30s
  pingAfter = 2; // 2s
  pingCount=0;
  interval;
  requestTimeout=true;

  constructor(private transDataService:DataService, private apiService:PaymentService, 
    private route:Router, private location:Location) { }
  ngOnInit() {
    this.subscription = this.transDataService.dataSource.subscribe(data=>{
      console.log(data);
      if(!data)this.location.back();
      this.transaction = data;
      if(data.status === 'INITIATED')this.syncPaymentStatus(null,data.pk);
    }, error=>{
      console.log('transaction data failed...', error);
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription)this.subscription.unsubscribe();
    clearInterval(this.interval);
    this.pingCount = 100;
  }
  


  syncPaymentStatus(event, pk){
    if(this.subscription)this.subscription.unsubscribe();
    if(!this.pending)this.pending=pk;
    this.subscription = this.apiService.syncPaymentStatus(pk).subscribe(res=>{
      this.transaction = res;
      if(res.ping_after)this.pingAfter = parseInt(res.ping_after);
      if(res.ping_timeout)this.timeout = parseInt(res.ping_timeout);
      this.pending = null;
      let self = this;
      this.requestTimeout = self.pingCount*self.pingAfter < self.timeout;
      console.debug("ping count:",this.pingCount, 'spent',this.pingCount * this.pingAfter, 'timeout', this.requestTimeout);
      if( this.requestTimeout && res.status === 'INITIATED'){
        self.pingCount +=1;
        this.interval = setTimeout(function(){
          self.syncPaymentStatus(null, pk);
        }, self.pingAfter*1000);
      }
    },err=>{
      this.pending=null;
    })
  }  

}
