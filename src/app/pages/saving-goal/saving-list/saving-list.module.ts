import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SavingListPage } from './saving-list.page';
import { SavingService } from 'src/app/services/saving.service';
import { SavingCardModule } from '../../../shared/saving-goal-card/saving-card.module';
import { EmptyStateModule } from 'src/app/core/components/empty-state/empty-state.module';
import { AvatarModule } from 'ngx-avatar';

const routes: Routes = [
  {
    path: '',
    component: SavingListPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SavingCardModule,
    EmptyStateModule,
    AvatarModule
  ],
  declarations: [SavingListPage],
  providers:[SavingService]
})
export class SavingListPageModule {}
