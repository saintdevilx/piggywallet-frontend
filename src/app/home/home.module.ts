import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SavingService } from '../services/saving.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { AvatarModule } from 'ngx-avatar';
import { SavingCardModule } from '../shared/saving-goal-card/saving-card.module';
import { BlogService } from '../services/blog.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    AvatarModule,
    SavingCardModule
  ],
  declarations: [HomePage],
  providers:[SavingService, AuthenticationService, BlogService, InAppBrowser, BrowserTab]
})
export class HomePageModule {}
