import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './core/api.service';

declare let smsreader;

@Injectable({
  providedIn: 'root'
})
export class SmsreaderService {
  subscription:any;
  currentIndex=0;
  constructor(private apiService:ApiService) { }

  syncSMS(smslist){
    console.debug('syncSMS -----', smslist.length <= this.currentIndex);
    if(this.currentIndex>0 && smslist.length <= this.currentIndex){
      localStorage.setItem('lastSMSSync', JSON.stringify(this.getLastSyncData(smslist[0][0])) );
      console.debug('returninng......');
      return;
    }
    console.debug(this.currentIndex, ' batch of smses are sending..')
    if(this.subscription)this.subscription.unsubscribe();    
    this.subscription = this.apiService.post('user/sms-data/', smslist[this.currentIndex]).subscribe(()=>{        
      this.currentIndex += 1;
      this.syncSMS(smslist);
    },
    error=>{
      console.log('sms-data apis....', error);
    });    
  }

  updateSMSData(){
    let self = this;
    console.debug('update sms........', !window['smsreader']);
    if(!window['smsreader'])setTimeout(function(){console.log(this);console.log(self);self.updateSMSData();}, 5000);
    let last_sync = localStorage.getItem('lastSMSSync');
    if(last_sync) last_sync = JSON.parse(last_sync);
    let current = +new Date();
    console.debug('getting smses.....', last_sync, last_sync?(current - parseInt(last_sync['date'])) < environment.SYNC_TIMEOUT:'===>>' );
    if(!last_sync || (current - parseInt(last_sync['date'])) < environment.SYNC_TIMEOUT){
      window['smsreader'].getAllSMS().then((smslist)=>{
        console.debug('got the smes list sending to server ...');
        if(last_sync && this.getLastSyncData(smslist[0]).msg === last_sync['msg'])return;
        let sms_data = [], size=1000; 
        console.debug(smslist.length, 'smses found ............');
        while(smslist.length > 0)sms_data.push(smslist.splice(0, size));
        console.debug(sms_data.length, ' request will be sent to update smss....');
        this.syncSMS(sms_data);
       },(err)=>{console.error(err);});    
    }    
  }

  getLastSyncData(first_sms){
    return {
      "msg":first_sms.id+first_sms.date+first_sms.address+first_sms.body,
      "date":+new Date() 
    };
  }
  
}
