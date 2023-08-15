import { Component, OnInit, NgZone } from '@angular/core';
import { SavingGoalFormDataService } from '../../saving-goal/create-saving/data.service';
import { DataService } from '../data.service';
import { TransactionService } from '../../../services/transaction.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { loadScript } from 'src/app/utils/utils';
import { PaymentResponseDataService } from '../payment-response-data.service';


const CashFree=null;

@Component({
  selector: 'app-after-payment',
  templateUrl: './after-payment.page.html',
  styleUrls: ['./after-payment.page.scss'],
})
export class AfterPaymentPage implements OnInit {
  data:any;
  subscriptions:Subscription[] = [];
  transDataSubscription:any;
  formData:any;
  constructor(private formDataService:SavingGoalFormDataService, 
    private dataService:DataService, private transService:TransactionService,
    private toastController: ToastController, private route:Router, private ngZone: NgZone,
    private paymentResponseDataService:PaymentResponseDataService) {

      loadScript(environment.CASHFREE_JS_SDK);

  }

  ngOnInit() {
    this.subscriptions.push(this.formDataService.formDataSource.subscribe(
      data =>{
        console.log('data:', data);
        this.data = data;
      },
      err => console.error('error while get')
    ))
    this.subscriptions.push(
      this.dataService.dataSource.subscribe(
        data=> {
          this.formData = data;
        }
      )
    )        
    console.log('======>>>>>>><<<>>>>>');
  }

  paynow(event){
    this.paymentFormPopup(this.formData);
  }

  paymentFormPopup(data){
    let cfInitialized=false;    
    data.paymentModes = 'upi'
    //data.upi_vpa = 'testsuccess@gocash'    
    if(data.signature){
      data.paymentToken = data.signature.toString();
      delete data.signature;
    }
    console.log(data);
    var callback = function (event) {
      var eventName = event.name;
      console.log('---callbakk.....', eventName, JSON.stringify(event));
      switch(eventName) {
        case "PAYMENT_REQUEST":
          if(event.status === 'SUCCESS')console.log('success');
          else if(event.status === 'ERROR')alert(event.message);
          console.log(event.message, event);
          break;
        case "PAYMENT_RESPONSE":        
          window['paymentCallBack'](event);
          document.getElementById('cf-outer-div').style.display = 'none';
          break;
        case "PAYMENT":
          break;
      default:
          console.log(event.message);
      };
   }
    var config = {layout:null, mode:null};
    config.layout = {view: "inline", width: "100%"};
    config.mode = "TEST"; //use PROD when you go live
    var response = window.hasOwnProperty('CashFree') ? window['CashFree'].init(config) : {};
    if (response.status == "OK") {
      cfInitialized = true;
    } else {
      //handle error
       console.log(response.message);
    }
    // Make sure you put id of your payment button that triggers the payment flow in the below statement.
      if (cfInitialized && window.hasOwnProperty('CashFree')) {
        window['paymentCallback'] = window['paymentCallBack'] || {};
        window['paymentCallBack'] = this.paymentCallBack.bind(this);
        window['CashFree'].makePayment(data, callback);      
    }

  }

  paymentCallBack(data){
    this.paymentResponseDataService.setData(data.response);
    this.ngZone.run(()=>{      
      if(data.response.hasOwnProperty('txStatus') && data.response['txStatus'] === 'CANCELLED'){
        const self=this;
        setTimeout(function(){self.route.navigate(['/saving-detail']);} ,200);
      }
      else this.route.navigate(['/complete']);
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.onSubmitForm();
    let self=this;
    console.log('========>>>>>>>');
    setTimeout(function(){self.paymentFormPopup(self.formData)}, 500);
  }

  onSubmitForm(){
    ///document.forms[0].submit();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

  }

  successPayment(){
    this.subscriptions.push(this.dataService.dataSource.subscribe(
      data=>{
        this.transService.webhookCallback(data.pk, 'success').subscribe(
          successData => {
            this.presentToast("Payment completed successfully");
            this.route.navigate(['/saving-detail']); 
          },
          errData =>  this.presentToast("Can not Accept Payment")
        );       
      },
      err => this.presentToast("Can not Accept Payment")
    ));
  }

  rejectPayment(){
    let transdatasub =this.transDataSubscription = this.dataService.dataSource.subscribe(
      data=>{
        let transsub =this.transService.webhookCallback(data.pk, 'failure').subscribe(
          successData => {
            this.presentToast("Payment Rejected successfully");
            this.route.navigate(['/saving-detail']); 
            transsub.unsubscribe();
          },
          errData => {
            this.presentToast("Can not Accept Payment");
            transsub.unsubscribe();
          }
        );
      },
      err => {
        this.presentToast("Can not reject Payment");
        transdatasub.unsubscribe();
      }
    );
  }

  async presentToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();   
  }     

}
