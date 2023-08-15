import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { Observable } from 'rxjs';
import { BankAccount } from '../pages/transaction/withdraw/withdraw.model';



export class BankInfo {
  BANK:string;
  IFSC:string;
  BRANCH:string;
  ADDRESS:string;
  CITY:string;
  DISTRICT:string;
  STATE:string;
  BANKCODE:string;
  RTGS:string;
  CONTACT:string;
}

@Injectable({
  providedIn: 'root'
})

export class BankAccountService {
  getUserBankAccounts(): Observable<Array<BankAccount>> {
   return this.apiService.get('user/bank-account/')
  }

  constructor(private apiService:ApiService) { }

  addBankAccount(bankAccount:BankAccount): Observable<BankAccount>{
    return this.apiService.post('user/bank-account/', bankAccount);
  }

  getBankDetailsFromIFSC(ifsc_code:string){
    return this.apiService._fetch(`https://ifsc.razorpay.com/${ifsc_code}`);
  }

}
