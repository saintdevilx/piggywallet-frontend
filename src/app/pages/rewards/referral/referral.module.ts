import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReferralPage } from './referral.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';

const routes: Routes = [
  {
    path: '',
    component: ReferralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReferralPage],
  providers:[Clipboard]
})
export class ReferralPageModule {}
