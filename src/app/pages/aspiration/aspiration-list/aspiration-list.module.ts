import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AspirationListPage } from './aspiration-list.page';
import { AspirationService } from 'src/app/services/aspiration.service';
import { EmptyStateModule } from 'src/app/core/components/empty-state/empty-state.module';

const routes: Routes = [
  {
    path: '',
    component: AspirationListPage
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
  declarations: [AspirationListPage],
  providers: [AspirationService]
})
export class AspirationListPageModule {}
