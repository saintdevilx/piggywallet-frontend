import { Component, OnInit, ViewChild } from '@angular/core';
import { createSavingForm } from './forms';
import { FormBuilder } from '@angular/forms';
import { SavingGoal } from './model';
import { SavingGoalFormDataService } from './data.service';
import { Router } from '@angular/router';
import { SavingService } from 'src/app/services/saving.service';
import { SavingGoalDataService } from '../saving-goal-data.service';
import { Subscription } from 'rxjs';
import { AspirationDataService } from '../../aspiration/aspiration-data.service';


@Component({
  selector: 'app-create-saving',
  templateUrl: './create-saving.page.html',
  styleUrls: ['./create-saving.page.scss'],
})

export class CreateSavingPage implements OnInit {
  savingGoalForm:any;
  savingGoalInstance:SavingGoal;
  submitted:boolean=false;

  subscription;

  constructor(public formbuilder:FormBuilder, private formDataService:SavingGoalFormDataService,
    private router:Router, private savingService:SavingService, 
    private savingDataService:SavingGoalDataService, private aspirationDataService:AspirationDataService) { }

  ngOnInit() {
    this.subscription = this.aspirationDataService.dataSource.subscribe(data => {
      this.savingGoalInstance = new SavingGoal()
      this.savingGoalInstance.setData(data);
      console.log(this.savingGoalInstance, data);
      this.savingGoalForm = createSavingForm(this.formbuilder, this.savingGoalInstance);   
    })
  }

  onSubmitform(event){
    if(this.savingGoalForm.value.submitted)return;
    let data = this.savingGoalForm.value;
    this.savingGoalForm.value.submitted = true;
    this.savingService.createSavingGoal(data).subscribe(
      data=>{
        this.savingGoalForm.reset();
        this.formDataService.setData(data);
        this.savingDataService.setData(data);
        this.router.navigate(['/saving-detail'], {replaceUrl:true});
      },
      err => {
        this.savingGoalForm.value.submitted = false;
      }
    );       
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.aspirationDataService.setData({});
    if(this.subscription)this.subscription.unsubscribe();
  }

}

