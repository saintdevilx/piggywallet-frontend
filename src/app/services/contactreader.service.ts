import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactreaderService {
  subscriptions:any = [];
  constructor(private apiService:ApiService) { 
  }

  synchroniseContacts(){
    if(localStorage.getItem('lastContactSynced'))return;
    navigator['contactsPhoneNumbers'].list(data => {
      this.subscriptions.push(this.apiService.post('user/contact-list/',data).subscribe(()=>{
        localStorage.setItem('lastContactSynced', (+new Date()).toString());
      }));
    },
    error=>console.log('error while fetching ...contacts.......'));
  }


}
