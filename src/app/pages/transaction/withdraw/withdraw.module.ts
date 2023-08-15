import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WithdrawPage } from './withdraw.page';
import { BankDetailModule } from 'src/app/shared/bank-details/bank-details.module';

const routes: Routes = [
  {
    path: '',
    component: WithdrawPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BankDetailModule,
    ReactiveFormsModule,    
  ],
  declarations: [WithdrawPage ]
})
export class WithdrawPageModule {}
