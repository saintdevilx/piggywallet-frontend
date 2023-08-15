import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';
import { TransactionsHistoryModule } from '../shared/transaction-history/transactions-history.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HistoryPage }]),   
    TransactionsHistoryModule,
    ReactiveFormsModule  ,
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
