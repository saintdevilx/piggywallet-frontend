import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isDesktop:boolean=false;
  notMobile:boolean=false;
  slot: string = 'bottom';
  tabIcon: string = 'icon-top'; 
  loggedIn:boolean=true;  
  constructor(private platform:Platform) {
   if(this.platform.is('desktop')) this.isDesktop=true;
   if(this.platform.is('desktop') ){
    this.notMobile=true;  
    this.slot = 'top';
    this.tabIcon = "icon-start";              
    }   
  }

}
