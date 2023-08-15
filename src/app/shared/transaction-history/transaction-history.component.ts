import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../pages/transaction/models/transaction.model';
import { getGroupByTransaction } from 'src/app/utils/utils';
import { PaymentService } from '../../services/payment.service';
import { DataService } from '../../pages/payment/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {

  historyResult:any;
  @Input() historyResultList:Array<Transaction>;
  subscription:any;
  pending;

  constructor(private apiService:PaymentService, private transDataService:DataService, private route:Router) { }

  updateHistoryResult(){
    this.historyResult = getGroupByTransaction( this.historyResultList, function(element){
      return new Date(element.created_at).toLocaleDateString().split('/').reverse().join('/');
    });      
  }

  ngOnInit() {
    this.updateHistoryResult();
  }

  
  ngOnChanges(changes): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if( changes.historyResultList.currentValue){
      this.historyResultList = changes.historyResultList.currentValue;
      this.updateHistoryResult();
    }
  }
  

  transactionDetail(event, transaction){
    console.log('openeing transactiond ata', transaction);
    this.transDataService.setData(transaction);
    this.route.navigate(['/transaction-detail'])
  }

}
