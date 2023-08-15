import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentPage } from './payment.page';
import { SavingService } from 'src/app/services/saving.service';
import { PaymentSummaryComponent } from '../payment-summary/payment-summary.component';
import { UserProfileFormModule } from 'src/app/shared/user-profile-form/user-profile-form/user-profile-form.module';
//import { WebIntent } from '@ionic-native/web-intent/ngx';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UserProfileFormModule
  ],
  declarations: [PaymentPage, PaymentSummaryComponent],
  providers: [SavingService],
  entryComponents: [PaymentSummaryComponent]
})
export class PaymentPageModule {}
