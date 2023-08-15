import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './transaction-history.component';
import { IonicModule } from '@ionic/angular';
import { EmptyStateModule } from 'src/app/core/components/empty-state/empty-state.module';
import { PaymentService } from 'src/app/services/payment.service';


@NgModule({
  declarations: [TransactionHistoryComponent],
  imports: [
    CommonModule,
    IonicModule,
    EmptyStateModule,    
  ],
  exports: [TransactionHistoryComponent],
  providers:[PaymentService]
})
export class TransactionsHistoryModule { }
