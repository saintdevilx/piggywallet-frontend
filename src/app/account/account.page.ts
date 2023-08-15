import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../pages/saving-goal/create-saving/model';
import { Router, Event as RouterEvent, NavigationEnd} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CurrentUserDataService } from '../services/current-user.data.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {
  user:User;
  subscription:any;
  
  ngOnInit(): void {
    this.currentUser.dataSource.subscribe(user=>{
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription)this.subscription.unsubscribe();
  }

  constructor(private authService:AuthenticationService, private router:Router, private alertController:AlertController, 
    private currentUser:CurrentUserDataService) {}

  ngOnChanges(changes): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
  }

  async logout(event){
    const alert = this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout ?',
      buttons:[
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.authService.logout();
            this.router.navigate(['/'],);
            location.reload();
          }
        }
      ]
    });       
    (await alert).present();   
  }

}
