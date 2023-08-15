import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubscriptionListPage } from './subscription-list.page';
import { AvatarModule } from 'ngx-avatar';
import { EmptyStateModule } from 'src/app/core/components/empty-state/empty-state.module';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AvatarModule,
    EmptyStateModule
  ],
  declarations: [SubscriptionListPage]
})
export class SubscriptionListPageModule {}
