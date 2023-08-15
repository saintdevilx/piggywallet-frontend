import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../pages/saving-goal/create-saving/model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { RegisterUserDetail } from '../pages/registration/forms';
import { UserProfileModel } from '../pages/user-profile/user-profile.model';
import { GlobalConfigDataService } from './global.config.data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


    currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private apiRequest:ApiService, private globalConfigService:GlobalConfigDataService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public getcurrentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public register(userData:RegisterUserDetail){
        this.syncUserDetail();
        return this.apiRequest.post('phone_login/generate/', userData);
    }

    public syncUserDetail(){
        console.debug('syncing....');
        return this.apiRequest.get(`phone_login/user/detail`).pipe(
            map(response=>{
                let local_data = JSON.parse(localStorage.getItem('currentUser'));
                let new_data = Object.assign(local_data, response.user);                
                localStorage.setItem('currentUser', JSON.stringify(new_data));
                this.set_data(response.user);
                this.globalConfigService.setData(response.config);                
                return response.user;                
            })
        )       
    }

    public login(data) {        
        return this.apiRequest.post(`phone_login/validate/`, data)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.saveToken(user.token);
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);        
    }

    public getToken(): String {
        return window.localStorage['Token'];
    }

    public saveToken(token: String) {
        window.localStorage['Token'] = token;
    }

    public destroyToken() {
        window.localStorage.removeItem('Token');
    }    
    getProfileImageUploadUrl(){
        return this.apiRequest.post('user/change-image');
    }   
    
    changeProfileImage(file_id){
        return this.apiRequest.put(`user/change-image/${file_id}/`)
    }

    set_data(user){
        this.currentUserSubject.next(Object.assign({}, user));
    }

    getFromStorage(){
        try{
            return JSON.parse(localStorage.getItem('currentUser'));
        }catch(e){
            return{}
        }
    }    

    updateProfileDetail(userProfile:UserProfileModel){
        return this.apiRequest.post('user/detail/', userProfile);
    }

    registerToken(token: string, name:string, device_id:string, platform:string) {
        return this.apiRequest.post('register/notification_token/',{
            registration_id: token,
            name:name,
            device_id: device_id,
            type:platform
        });
    }    

    resendVerifyEmailLink(){
        return this.apiRequest.post('user/send-email-verification/')
    }
}