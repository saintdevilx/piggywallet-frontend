import { Component, OnInit } from '@angular/core';
import { RegisterUserDetail, getRegistrationForm } from './forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RegisterationFormDataService } from './data.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { presentToast, limitInputFieldLength } from 'src/app/utils/utils';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, AlertController } from '@ionic/angular';
import {auth as firebaseAuth} from 'firebase';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationForm:any;
  isSubmitted:boolean = false;
  authSubscription:any;
  errors:any;
  verificationId:string;
  permissions:any;

  constructor(private formBuilder:FormBuilder, private registerFormData:RegisterationFormDataService, 
    private authService:AuthenticationService, private router:Router,private afAuth: AngularFireAuth, 
    private gplus: GooglePlus) { }

  ngOnInit() {
    let initialFormData = new RegisterUserDetail().initializeFormControl();
    this.registrationForm = getRegistrationForm(initialFormData, this.formBuilder);
    console.debug(this.registrationForm.value, this.registrationForm);
  }

  onSubmit(){    
    let formData = Object.assign({},this.registrationForm.value);
    if(this.isSubmitted)return;
    this.isSubmitted=true;
    const phone_number = formData['phone_number'].replace(`+${formData['country_code']}`, "");
    console.debug(this.registrationForm);
    formData['phone_number'] = `+${formData['country_code']}${formData['phone_number']}`;

    this.authService.register(formData).subscribe(data => {      
       console.debug('otp requested...');  
        this.isSubmitted = false;
        data['full_name'] = this.registrationForm.value['full_name'];
        data['phone_number'] = phone_number
        data['country_code'] = this.registrationForm.value['country_code']
        this.registerFormData.setData(data);
        this.router.navigate(['/otp-verify'], {replaceUrl:true});
      },err => {
        this.isSubmitted = false;
        this.errors = Object.assign({}, err.reason, this.errors);
        console.debug(this.errors, err);
        presentToast("Something went wrong. Please try again.");
    });  
  }


  onPhoneNumberInput(event){
    return limitInputFieldLength(event, 'app-registration input[type=tel]', 10);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.authSubscription)this.authSubscription.unsubscribe();
  }


}
