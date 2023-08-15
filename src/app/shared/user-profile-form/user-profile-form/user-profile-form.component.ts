import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { presentToast } from 'src/app/utils/utils';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/pages/saving-goal/create-saving/model';
import { UserProfileModel } from 'src/app/pages/user-profile/user-profile.model';
import { createUserProfileForm } from 'src/app/pages/user-profile/user-profile.form';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx'; // We'll install this in the next section
import * as firebase from 'firebase/app';
import { error } from 'protractor';
import { environment } from '../../../../environments/environment';
import { CurrentUserDataService } from 'src/app/services/current-user.data.service';


@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnInit {

  @Input() redirectUrl:string;
  enableManualMode:boolean=false;
  dataSubscription:any;
  user:User;
  userProfileInstance:any;
  userProfileForm:any; 
  uploading:boolean=false;
  image_url:string;
  imageChangedEvent:any;
  croppedImage:any;
  imageSelected:boolean=false;
  errors:any=[];
  statusPending={'status':false};
  emailSent=false;
  subscription;  
  

  constructor(private authService:AuthenticationService, private formbuilder:FormBuilder,
    private uploadService:UploadService, private router:Router, private afAuth: AngularFireAuth, 
    private gplus: GooglePlus, private platform: Platform,private _ngZone: NgZone, 
    private currentUser:CurrentUserDataService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.dataSubscription = this.currentUser.dataSource.subscribe(
      user=>{ this.user=user;
        console.debug(user,'==...>>>');
        this.userProfileInstance = new UserProfileModel({});       
        this.userProfileInstance.full_name = user ? `${user.first_name||""} ${user.last_name||""}` : null;
        this.userProfileInstance.email = user?user.email:"";
        this.userProfileInstance.image = user?user.image:"";
        this.image_url = user?user.image:"";          
        this.userProfileInstance.emailVerified = user.email_verified;      
        this.userProfileForm = createUserProfileForm();        
        this.userProfileForm.patchValue(this.userProfileInstance);
        console.debug(this.userProfileInstance, 'instance....', this.userProfileForm.value);
        if(user.email)this.enableManualMode = true;
        return user;
      }
    )
    this.statusPending={'status':false};
    this.errors=[];

    this.route.queryParams.subscribe(params=>{
      console.log('params', params);
      this.redirectUrl = params.next;
    })

  }


  selectFile(event){
    console.debug('upload start..');
    this.imageSelected=true;
    this.imageChangedEvent = event;
  }

  imageCropped(event:ImageCroppedEvent){
    this.croppedImage = event.file;
    console.log(this.croppedImage);    
  }

  imageLoaded(){}

  cropperReady(){}

  loadImageFailed(){
    presentToast('Could not load this image please check try again with some other image.');
  }

  uploadImage(event){
    if(this.uploading)return;
    this.uploading = true;
    this.imageSelected=false;
    const selectedFile =  this.croppedImage;
    this.authService.getProfileImageUploadUrl().subscribe(image_data=>{
      console.debug('signed_url recieved',image_data);
      const formData = new FormData();
      
      for(let key in image_data.fields){
        formData.append(key, image_data.fields[key]);
      }
      formData.append('file', selectedFile);
      this.uploadService.uploadToS3(formData, image_data.url).subscribe(data=>{
        this.uploading = false;
        console.debug('image uploaded to s3....');
        this.authService.changeProfileImage(image_data.file_id).subscribe(data=>{
          this.image_url = image_data.image_url;
          this.user.image = this.image_url;
          this.authService.set_data(this.user);
          console.log(this.user);
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        });                
      }, err=>{
        console.log('couldnot upload........', err);
        this.uploading = false;
        //event.target.value = ''
      })
    }, error=>{
      this.uploading = false;
      console.debug('coudnot get signed url...', error);
      presentToast('Something went wrong please try again.');
    })    
  }

  get f() { return this.userProfileForm.controls; }

  onSubmit(event){
    if(this.userProfileForm.value.submitted)return;
    let data = this.userProfileForm.value;
    this.userProfileForm.value.submitted = true;    
    this.authService.updateProfileDetail(data).subscribe(user=>{
      presentToast('Details updated successfully !!');
      console.debug('updated user data', user, this.redirectUrl);
      this.router.navigate([this.redirectUrl ? this.redirectUrl :'tabs/account']);
      this.userProfileForm.patchValue({'submitted':false});
      this.authService.set_data(user);
    },
    error=>{
      this.userProfileForm.patchValue({'submitted':false});
      presentToast('Could not update the details. Please try later.')
    });
  }

  async nativeGoogleLogin(): Promise<void> {
    console.log('native login.....', this.statusPending.status);
    if(this.statusPending.status)return;
    this.statusPending.status =  true;
    const self = this;
    try 
    {
        const gplusUser = await this.gplus.login({
        'webClientId': environment.GOOGLE_WEB_CLIENT_ID,
        //'offline': true
      }).then(user=>{ 
          console.log('google.....user...----.', user);        
          this.updateDetail(user.idToken); 
      }).catch(error=>{
        presentToast('something went wrong while login...');
        self.toggleManualMode(null);
        self.statusPending.status =  false;
        console.log(error);
      })
    } catch(err) { console.log(err,'login google error....'); }
  }  

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      let self=this;
      this.afAuth.auth.signInWithPopup(provider).then(data=>{
        data.user.getIdToken().then(token=>{
          this.updateDetail(token);
        }).catch(error=>{
          this.asyncUpdate(function(){
            this.statusPending.status = false;
          });
          presentToast('Login Failed pleae try again...')
        })
      }).catch(error=>{
        this.asyncUpdate(function(){
          this.statusPending.status = false;
        });        
        presentToast('Login failed');
      });
      
    } catch(err) {
      console.log(err, 'error....');
    }  
  }

  updateDetail(token){
    const user = new UserProfileModel({'provider':'google','idToken':token});
    console.log('user......', user);
    this.authService.updateProfileDetail(user).subscribe(user=>{
      this.authService.set_data(user);
      this.router.navigate([this.redirectUrl ? this.redirectUrl :'tabs/home']);
    },error=>{      
      console.log('errror update details...', error);
      this.asyncUpdate(function(){
        this.errors = [error];
        this.statusPending.status = false;
      });
    })    
  }

  asyncUpdate(fn){
    this._ngZone.run(()=>{
      fn.apply(this);
    })    
  }
  
  
  googleLogin(event) {    
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin()
    } else {
      this.statusPending.status=true;
      console.log('web login......');
      this.webGoogleLogin();
    }
  }

  toggleOtherEmail(event){
    this.enableManualMode= !this.enableManualMode;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.dataSubscription)this.dataSubscription.unsubscribe();
  }  

  toggleManualMode(event){
    this.enableManualMode = !this.enableManualMode;
  }

  resendVerifyEmail(event){
    if(this.emailSent)return;    
    this.authService.resendVerifyEmailLink().subscribe(res=>{
      console.debug(res, '');
      this.emailSent = true;
    });
  }

}