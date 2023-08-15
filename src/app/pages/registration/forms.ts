import { FormBuilder, FormGroup, FormControl, Validators,  } from '@angular/forms';

export class RegisterUserDetail {
    pk?:string;
    otp_ref?:string;
    full_name?:string;
    phone_number:string;
    country_code?:string="91";
    otp?:string;    

    initializeFormControl(){
        let form = {
            'phone_number': [this.phone_number, [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
            'country_code': [this.country_code, [Validators.maxLength(3)]]
        }
        return form;
    }

    initializeOTPFormControl(){
        return {
            'otp' : [this.otp, [Validators.required, Validators.minLength(6), Validators.maxLength(6)] ],
            'otp_ref': [this.otp_ref, [Validators.required] ],
        }
    }
}


export function getRegistrationForm(userDataInstance:any, formBuilder:FormBuilder){
    console.debug(RegisterUserDetail);
    return formBuilder.group(userDataInstance);
}


