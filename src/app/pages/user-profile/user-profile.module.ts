import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserProfilePage } from './user-profile.page';
import { AuthenticationService } from '../../services/auth.service';
import { AvatarModule } from 'ngx-avatar';
import { UserProfileFormModule } from 'src/app/shared/user-profile-form/user-profile-form/user-profile-form.module';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
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
  declarations: [UserProfilePage],
  providers:[AuthenticationService]
})
export class UserProfilePageModule {}
