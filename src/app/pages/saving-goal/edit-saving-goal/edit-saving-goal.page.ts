import { Component, OnInit } from '@angular/core';
import { SavingGoalModel, SavingGoal } from '../create-saving/model';
import { SavingGoalDataService } from '../saving-goal-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { createSavingForm } from '../create-saving/forms';
import { SavingService } from 'src/app/services/saving.service';
import { SavingGoalFormDataService } from '../create-saving/data.service';

@Component({
  selector: 'app-edit-saving-goal',
  templateUrl: './edit-saving-goal.page.html',
  styleUrls: ['./edit-saving-goal.page.scss'],
})
export class EditSavingGoalPage implements OnInit {
  savingGoalInstance:SavingGoalModel;
  savingGoalForm:any;

  constructor(private savingDataService:SavingGoalDataService, private router:Router, 
    public formbuilder:FormBuilder, private savingService:SavingService, 
    private formDataService:SavingGoalFormDataService) { }

  ngOnInit() {
    this.savingDataService.dataSource.subscribe(
      data =>{
        this.savingGoalInstance = data;
        console.log(data.target_date < new Date(), data.target_date , new Date(),' ====>>>>');
        let current_date_string =  new Date().toISOString().split('T')[0];
        if(data.target_date.toString() < current_date_string) data.target_date = null;
        this.savingGoalForm = createSavingForm(this.formbuilder, data);
      },
      error => {
        this.router.navigate(['/saving-details'])
      }
    )
  }

  onSubmitForm(event){
    if(this.savingGoalForm.value.submitted)return;
    let data = this.savingGoalForm.value;
    this.savingGoalForm.value.submitted = true;
    this.savingService.createSavingGoal(data, data.pk).subscribe(
      data=>{
        this.savingGoalForm.reset();
        this.formDataService.setData(data);
        this.savingDataService.setData(data);
        this.router.navigate(['/saving-detail']);
      },
      err => {
        this.savingGoalForm.value.submitted = false;
      }
    );    


  }

}
