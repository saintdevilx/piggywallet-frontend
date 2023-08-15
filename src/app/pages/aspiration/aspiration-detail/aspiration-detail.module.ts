import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AspirationDetailPage } from './aspiration-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AspirationDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AspirationDetailPage]
})
export class AspirationDetailPageModule {}
