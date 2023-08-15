import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SavingCardComponent } from './saving-card.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { AvatarModule } from 'ngx-avatar';



@NgModule({
  declarations: [SavingCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    AvatarModule
  ],
  exports: [SavingCardComponent]
})
export class SavingCardModule { }
