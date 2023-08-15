import { Component, OnInit } from '@angular/core';
import { limitInputFieldLength, presentToast } from 'src/app/utils/utils';
import { createKYCDEtailForm, KYCDetail } from './kyc.form';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { KYCService } from '../../../services/kyc.service';
import { error } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ekyc-details',
  templateUrl: './ekyc-details.page.html',
  styleUrls: ['./ekyc-details.page.scss'],
})
export class EkycDetailsPage implements OnInit {

  kycDetailForm:any;
  kyc_file:any;
  KYCDetailData;
  redirectToUIDAI=false;
  permissionAllowed=false;

  constructor(private formBuilder:FormBuilder, private kycService:KYCService, 
    private sanitizer: DomSanitizer, private iab:InAppBrowser, private browserTab:BrowserTab,
    private platform:Platform, private route:Router) { }

  ngOnInit() {    
    const kycdetail = new KYCDetail().initializeFormControl();
    this.kycDetailForm =  new FormGroup(kycdetail);
    this.KYCDetailData = {
      kycStatus:undefined,
      step:1
    };   
    this.generateShareCode(null);
    this.kycService.getKYCDetail().subscribe(data=>{
      this.KYCDetailData.kycStatus = true;      
      Object.assign(this.KYCDetailData, data);
      this.KYCDetailData.adhaar_image = this.sanitizer.bypassSecurityTrustUrl(this.KYCDetailData.adhaar_image);
      console.debug(this.KYCDetailData);
    },error=>{
      console.debug(error, 'error........');      
      this.KYCDetailData.kycStatus = false;
    })
  }

  ionViewDidEnter(): void {
   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
   //Add 'implements AfterViewInit' to the class.
   const cordova = window['cordova'];
   const self = this;
   if(cordova){      
     const permissions = cordova.plugins['permissions'];
     const perm = permissions.WRITE_EXTERNAL_STORAGE;
     const onsuccess = function(status){
        if(!status.hasPermission){
          permissions.requestPermission(perm, function(){
            self.permissionAllowed=true;
          }, function(){
            self.permissionAllowed=false;
          });
        }
        else{
          self.permissionAllowed = true;
        }
     };
     permissions.checkPermission(perm, onsuccess);
   }   
 }

  onInputPhone(event){
    return limitInputFieldLength(event,'app-ekyc-details #phone input', 10);    
  }

  get f() { return this.kycDetailForm.controls; }

  onInputAdhaar(event){
    return limitInputFieldLength(event,'app-ekyc-details #adhaar_no input', 12);    
  }

  _redirectToUIDAI(event){
    this.redirectToUIDAI = !this.redirectToUIDAI;
    if(!this.platform.is('cordova'))return;
    const self = this;

    const keepLookingForZip = function(){
      console.log('keep looking for zip');
      self.findZipFile(function(file, data){
        if(!file){setTimeout(keepLookingForZip, 500); return;}
        else{
          self.kycDetailForm.patchValue({'offline_kyc_file':data._result});
          console.debug(self.kycDetailForm);
          self.onSubmit(null);
        }
      }, function(err){
        console.debug('find zip file error', err);
      })        
      window['plugins'].FileChangeObserver.stopWatch();
    }
    document.addEventListener("resume", onResume, false);

    function onResume() {
        // Handle the resume event
        keepLookingForZip();
    }
    window['plugins'].FileChangeObserver.stopWatch();
    if(window['plugins']&&window['plugins'].FileChangeObserver){
      console.debug(window['plugins']&&window['plugins'].FileChangeObserver)
      const dt = new Date().toJSON().split('T')[0].split('-').join('');
      window['plugins'].FileChangeObserver.startWatch(`/Download/offlineaadhaar${dt}.*.zip`, window['plugins'].FileChangeObserver.WRITE  , function(d){
        console.debug('fileobserver:',d);
      }, function(e){
        console.debug('error file observer',e);
      });
    }      

    setTimeout(function(){self.openOfflineKYC();}, 200);    
  }

  nextStep(event){
    if(this.KYCDetailData.step < 3) this.KYCDetailData.step += 1;
  }


  openOfflineKYC(){
    this.browserTab.isAvailable()
    .then(isAvailable => {
      console.debug('is available......');        
      if (isAvailable) {
        this.browserTab.openUrl('https://resident.uidai.gov.in/offline-kyc');
      } else {
        this.iab.create('https://resident.uidai.gov.in/offline-kyc', '_system','hideurlbar=yes,zoom=no,navigationbuttoncolor=#FFFFff,closebuttoncolor=#ffffff,toolbarcolor=#a657ff');
      }
    });    
  }

  
  findZipFile(onSuccess, onError){
    let sortedFIleMap={}
    let sortedFIleList=[];
    const callback = function(filelist){
      console.debug('file list', filelist);
      filelist.forEach( _file => {
        _file.getMetadata(function(d){  
          sortedFIleList.push(+d.modificationTime);
          sortedFIleMap[+d.modificationTime] = _file;
        }, function(err){
          console.debug(err, 'error'); 
        })        
      });

      let cb = function(){
        console.debug(sortedFIleList, sortedFIleMap);
        let fileEntry=null;
        if(sortedFIleList.length>1){
          const key = sortedFIleList.sort().reverse()[0];
          fileEntry = sortedFIleMap[key];
          console.debug('key....', key, fileEntry, sortedFIleMap[key]);
        }
        else fileEntry = sortedFIleList.length?sortedFIleMap[sortedFIleList[0]]:null;    
        console.debug('file.....Enry...', fileEntry, sortedFIleList.length);
        if(fileEntry){
            fileEntry.file( function(file) {
            console.debug('---fileEbtry,....', file);
            const reader = new FileReader();
            reader.onloadend = function(evt) {onSuccess(file, evt.target);};
            reader.readAsDataURL(file);          
          })
        }
        else onSuccess(null);
      }
      setTimeout(cb, 100);
    }    
    if(callback)this.getAddharofflineFile(callback); 
  }

  onSubmit(event){
    if(event) console.debug(event.target['offline_kyc_file'], this.kycDetailForm.value);
    if(this.kycDetailForm.submitted)return;
    this.kycDetailForm.submitted=true;
    let formData;
    if(this.platform.is('cordova')){
      formData = this.kycDetailForm.value;
      formData['raw_data'] = true
    }else{
    formData = new FormData();
      for(const key  in this.kycDetailForm.value){
        console.log(key, '=>', this.kycDetailForm.value[key]);
        formData.append(key, this.kycDetailForm.value[key]);
      }
      console.log(this.kyc_file, this.kycDetailForm.value['offline_kyc_file']);      
    }
    if(this.kyc_file){
      formData.append('file', this.kyc_file,  this.kycDetailForm.value['offline_kyc_file'] );
    }
    this.kycService.updateKYCDetail(formData).subscribe(data=>{
      this.kycDetailForm.submitted = false;
      this.KYCDetailData.kycStatus = true;      
      Object.assign(this.KYCDetailData, data);
      this.KYCDetailData.adhaar_image = this.sanitizer.bypassSecurityTrustUrl(this.KYCDetailData.adhaar_image);      
      this.kycDetailForm
    },error=>{
      this.kycDetailForm.submitted = false;
      presentToast('Could not update KYC detail. Please try later.');
    });
  }
  
  onFileChoose(event){
    this.kyc_file = event.target.files[0];
  }

  generateShareCode(event){
    const num = Math.random();
    const str = num.toString().substr(2);
    const index = parseInt((num*10).toString());
    const share_code = str.substr( index , 4);
    this.kycDetailForm['share_code'] = str.substr( index , 4);
    this.kycDetailForm.patchValue({'share_code':share_code});
  }

  listDir(path, callb){
    window['resolveLocalFileSystemURL'](path,
      function (fileSystem) {
        var reader = fileSystem['createReader']();
        reader.readEntries(
          function (entries) {
               callb(entries);		
          },
          function (err) {
            console.debug(err);
          }
        );
      }, function (err) {
        console.debug(err);
      }
    );
  }
  
  getAddharofflineFile(cb){
    console.log(' get adhaar.....');
    try{
    const download = window['cordova']['file']['externalRootDirectory']+'Download/';
    const dt = new Date().toJSON().split('T')[0].split('-').join('');
    this.listDir(download, function(entries){
      const reg = new RegExp(`offlineaadhaar${dt}.*.zip`);
      const fileList = [];
      entries.forEach(_file=>{
        if(reg.test(_file.name.trim())){ 
          fileList.push(_file);
        }
      })
      cb(fileList);
    })}catch(e){console.error(e, 'get adhaar....');}
  }

}
