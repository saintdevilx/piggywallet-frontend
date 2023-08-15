import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScratchPage } from './scratch.page';
import { BankDetailModule } from '../../../shared/bank-details/bank-details.module';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

const routes: Routes = [
  {
    path: '',
    component: ScratchPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BankDetailModule
  ],
  declarations: [ScratchPage],
  providers: [InAppBrowser, BrowserTab]
})
export class ScratchPageModule {}
