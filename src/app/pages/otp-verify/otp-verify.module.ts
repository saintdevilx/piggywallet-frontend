import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OtpVerifyPage } from './otp-verify.page';
import { CountdownModule } from 'ngx-countdown';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

const routes: Routes = [
  {
    path: '',
    component: OtpVerifyPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CountdownModule,
    ReactiveFormsModule,
  ],
  declarations: [OtpVerifyPage],
  providers:[SmsRetriever, FirebaseAnalytics]
})
export class OtpVerifyPageModule {}
