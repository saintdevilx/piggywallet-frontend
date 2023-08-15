import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SavingDetailPage } from './saving-detail.page';
import {TimeAgoPipe} from 'time-ago-pipe';
import { TransactionService } from 'src/app/services/transaction.service';
import { PopoverComponent } from './popover/popover.component';
import { SavingService } from 'src/app/services/saving.service';
import { TooltipsModule } from 'ionic-tooltips';
import { SubscriptionService } from '../../payment/subscription/subscription.service';
import { TransactionListPageModule } from '../../transaction/transaction-list/transaction-list.module';
import { TransactionsHistoryModule } from 'src/app/shared/transaction-history/transactions-history.module';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';

const routes: Routes = [
  {
    path: '',
    component: SavingDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TooltipsModule,
    TransactionsHistoryModule
  ],
  declarations: [SavingDetailPage, TimeAgoPipe, PopoverComponent],
  providers:[TransactionService, SavingService, FirebaseConfig],
  entryComponents:[PopoverComponent],
  exports:[TimeAgoPipe]
})
export class SavingDetailPageModule {}
