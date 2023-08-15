import { Component, OnInit } from '@angular/core';
import { SavingGoalFormDataService } from '../../create-saving/data.service';
import { AlertController, NavParams } from '@ionic/angular';
import { SavingGoalDataService } from '../../saving-goal-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  savingGoal:any;
  constructor(private savingGoalData:SavingGoalFormDataService, 
    private alertCtrl:AlertController, public navParams:NavParams, 
    private router:Router) { }

  ngOnInit() {

  }

  editDtails(event, pk){
    this.router.navigate(['/edit-saving-goal']);
    this.navParams.data.popover.dismiss();
  }

  async closeSaving(pk, event){
    let alert = this.alertCtrl.create({
      header: 'Close Saving',
      message: 'This will close your saving and you will not be able to resume it again. do you want to close this saving?',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Close saving',
          handler: data => {
            this.navParams.data.parentRef.closeSavingGoal();
          }
        }
      ]
    });       
    this.navParams.data.popover.dismiss();
    (await alert).present();
  }

  withdraw(event){
    console.log('popver withdraw....');
    this.navParams.data.parentRef.withdraw();
  }

}
