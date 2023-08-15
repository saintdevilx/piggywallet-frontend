import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserDetailPromptPage } from './user-detail-prompt.page';
import { UserProfileFormModule } from 'src/app/shared/user-profile-form/user-profile-form/user-profile-form.module';

const routes: Routes = [
  {
    path: '',
    component: UserDetailPromptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UserProfileFormModule
  ],
  declarations: [UserDetailPromptPage]
})
export class UserDetailPromptPageModule {}
