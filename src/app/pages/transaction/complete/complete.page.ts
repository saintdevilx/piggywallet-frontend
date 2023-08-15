import { Component, OnInit } from '@angular/core';
import { PaymentResponseDataService } from '../../payment/payment-response-data.service';
import { Router } from '@angular/router';
import { presentToast } from 'src/app/utils/utils';
import { DataService } from '../../payment/data.service';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {

  status = null;
  subscription;
  paymentData:any;
  retryAttempt=5;
  subscriptions:any=[];
  
  constructor(private paymentResponseDataService:PaymentResponseDataService, private _route:Router, 
    private dataService:DataService, private payemtApiService:PaymentService) { }

  ngOnInit() {
    const subscription = this.dataService.dataSource.subscribe(data=>{
      console.log('data service data', data);
      if(!data)this._route.navigate(['/saving-detail']);
      data['response'] = {'status':'SUCCESS'};
      this.paymentData = data['params'];
      if(data['response'] &&  ["SUCCESS", "PENDING"].indexOf(data['response']['status'])!=-1){
        this.status = "PENDING";
        this.getOrderStatus();
      }
      else this.status = (data['response'] && data['response']['status']) ? data['response']['status'] : 'PENDING';
      console.log(this.status, 'status.................');
    })
    this.subscriptions.push(subscription);
  }

  getOrderStatus(){
    const self = this;
    console.log('get order status....');
    const sub = this.payemtApiService.checkPaymentStatus(this.paymentData).subscribe(data=>{
      console.log('payemtne order status', data);
      if(data.STATUS === 'TXN_SUCCESS') this.status = 'SUCCESS';
      else if(data.STATUS === 'TXN_FAILED') this.status = 'FAILURE';
      else if(data.STATUS === 'PENDING') {
        this.status = 'PENDING';
        if(self.retryAttempt){
          self.retryAttempt -=1;
          console.log(self.retryAttempt, 'retry attempt left');
          setTimeout(self.getOrderStatus, 500);
        }
      }
    })
    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    }); 
  }

}
