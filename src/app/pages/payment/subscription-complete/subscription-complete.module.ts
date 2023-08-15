import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubscriptionCompletePage } from './subscription-complete.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionCompletePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscriptionCompletePage]
})
export class SubscriptionCompletePageModule {}
