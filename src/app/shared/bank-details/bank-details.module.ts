import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BankDetailsComponent } from './bank-details.component';
import { AvatarModule } from 'ngx-avatar';
import { BankAccountService } from 'src/app/services/bank-account.service';

@NgModule({
    declarations: [BankDetailsComponent],
    imports: [
        CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,    
      AvatarModule
    ],
    exports: [BankDetailsComponent],
    providers:[BankAccountService]
  })
  export class BankDetailModule { }
  