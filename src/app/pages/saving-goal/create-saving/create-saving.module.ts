import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateSavingPage } from './create-saving.page';
import { SavingService } from 'src/app/services/saving.service';
import { SavingDetailFormModule } from 'src/app/shared/saving-detail-form/saving-detail-form.module';

const routes: Routes = [
  {
    path: '',
    component: CreateSavingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SavingDetailFormModule
  ],
  declarations: [CreateSavingPage],
  providers:[SavingService],
})
export class CreateSavingPageModule {}
