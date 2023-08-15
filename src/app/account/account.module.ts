import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './account.page';
import { AuthenticationService } from 'src/app/services/auth.service';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [
  IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AccountPage }]),
    AvatarModule
  ],
  declarations: [AccountPage],
  providers:[AuthenticationService]
})
export class AccountPageModule {}
