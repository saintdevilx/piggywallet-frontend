import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProfileFormComponent } from './user-profile-form.component';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [UserProfileFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    AvatarModule,
    ReactiveFormsModule  ,    
    ImageCropperModule
  ],
  exports:[UserProfileFormComponent]
})
export class UserProfileFormModule { }
