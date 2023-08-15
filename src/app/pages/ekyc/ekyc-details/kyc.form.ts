
import { FormBuilder, Validators, FormControl } from '@angular/forms';
export class KYCDetail{
    adhaar_no?:string;
    offline_kyc_file:File;
    phone:string;
    share_code:string;
    submitted?:boolean;

    initializeFormControl(){
        return {
            //adhaar_no: new FormControl(this.adhaar_no || '', [Validators.required , Validators.minLength(12), Validators.maxLength(12)]),
            phone: new FormControl(this.phone || '', [Validators.required, Validators.maxLength(10),  Validators.minLength(10)]),
            share_code: new FormControl(this.share_code, Validators.required),
            offline_kyc_file: new FormControl(this.offline_kyc_file || '', Validators.required)
        }
    }
}

export function createKYCDEtailForm(formbuilder:FormBuilder, kycDetailObj){
    return formbuilder.group(kycDetailObj);
}