import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EmptyStateModule } from '../../core/components/empty-state/empty-state.module';
import { IonicModule } from '@ionic/angular';

import { RewardsPage } from './rewards.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EmptyStateModule
  ],
  declarations: [RewardsPage]
})
export class RewardsPageModule {}
