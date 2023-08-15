import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SavingDetailFormComponent } from './saving-detail-form.component';



@NgModule({
  declarations: [SavingDetailFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,    
  ],
  exports: [SavingDetailFormComponent]
})
export class SavingDetailFormModule { }
