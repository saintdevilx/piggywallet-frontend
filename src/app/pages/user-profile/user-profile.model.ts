import { BaseModel } from 'src/app/services/core/base.model';
import { FormControl, Validators } from '@angular/forms';

export class UserProfileModel extends BaseModel{
    full_name:string;
    email:string;
    image:string;
    provider?:string;
    idToken?:string;
    emailVerified?:boolean;

    initializeFormControl(){
        return {
            full_name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        }
    }
}