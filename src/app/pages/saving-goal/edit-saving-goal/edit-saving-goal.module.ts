import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditSavingGoalPage } from './edit-saving-goal.page';
import { SavingDetailFormComponent } from 'src/app/shared/saving-detail-form/saving-detail-form.component';
import { SavingDetailFormModule } from 'src/app/shared/saving-detail-form/saving-detail-form.module';
import { SavingService } from 'src/app/services/saving.service';
//import { SavingDetailFormComponent } from '../saving-detail-form/saving-detail-form.component';

const routes: Routes = [
  {
    path: '',
    component: EditSavingGoalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SavingDetailFormModule
  ],
  declarations: [EditSavingGoalPage],
  providers:[SavingService],
})
export class EditSavingGoalPageModule {}
