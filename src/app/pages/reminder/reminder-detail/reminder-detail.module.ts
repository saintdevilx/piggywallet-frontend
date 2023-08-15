import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReminderDetailPage } from './reminder-detail.page';
import { SavingCardModule } from 'src/app/shared/saving-goal-card/saving-card.module';
import { AvatarModule } from 'ngx-avatar';

const routes: Routes = [
  {
    path: '',
    component: ReminderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SavingCardModule,
    AvatarModule
  ],
  declarations: [ReminderDetailPage]
})
export class ReminderDetailPageModule {}
