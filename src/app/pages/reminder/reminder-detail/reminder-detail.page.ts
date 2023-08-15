import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavingGoalDataService } from '../../saving-goal/saving-goal-data.service';
import { ApiService } from '../../../services/core/api.service';
import { SavingService } from '../../../services/saving.service';
import { NotificationDataService } from '../notification.data.service';
import { SavingGoalFormDataService } from '../../saving-goal/create-saving/data.service';
import { SavingGoalModel } from '../../saving-goal/create-saving/model';

@Component({
  selector: 'app-reminder-detail',
  templateUrl: './reminder-detail.page.html',
  styleUrls: ['./reminder-detail.page.scss'],
})
export class ReminderDetailPage implements OnInit {

  savingGoal:SavingGoalModel;
  subscription;
  constructor(private router:Router, private savingDataService:SavingGoalDataService, 
    private apiService:ApiService, private savingService:SavingService, private formDataService:SavingGoalFormDataService) {   
  }

  ngOnInit() {
    this.subscription  = this.savingDataService.dataSource.subscribe(data=>{
      this.savingGoal = new SavingGoalModel(data);
    })
  }

  goPay(event){
    this.formDataService.setData(this.savingGoal);
    this.router.navigate(['/payment']);    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription)this.subscription.unsubscribe();
  }

}
