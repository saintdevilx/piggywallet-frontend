import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubscriptionPage } from './subscription.page';
import { SavingService } from 'src/app/services/saving.service';
import { SavingGoalDataService } from '../../saving-goal/saving-goal-data.service';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscriptionPage],
  providers: [SavingService]
})
export class SubscriptionPageModule {}
