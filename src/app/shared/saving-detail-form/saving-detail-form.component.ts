import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SavingService } from 'src/app/services/saving.service';
import { SavingGoalFormDataService } from 'src/app/pages/saving-goal/create-saving/data.service';
import { SavingGoalDataService } from 'src/app/pages/saving-goal/saving-goal-data.service';
import { createSavingForm } from 'src/app/pages/saving-goal/create-saving/forms';
import { SavingGoal } from 'src/app/pages/saving-goal/create-saving/model';
import { error } from 'protractor';
import { GlobalConfigDataService } from 'src/app/services/global.config.data.service';


const MIN_DEPOSIT_AMOUNT = 100; // 
const MAX_DEPOSIT_AMOUNT = 100000; // 1 lakh

@Component({
  selector: 'app-saving-detail-form',
  templateUrl: './saving-detail-form.component.html',
  styleUrls: ['./saving-detail-form.component.scss'],
})
export class SavingDetailFormComponent implements OnInit {

  @Input() savingGoalForm:any;
  @Output('submit') savingGoalFormData = new EventEmitter();
  
  minAmount:number = MIN_DEPOSIT_AMOUNT;
  maxAmount:number = MAX_DEPOSIT_AMOUNT;
  savingAmount:number;
  frequency:number;
  today;
  title:string;
  deductionAmount:any;
  timeline;
  number_of_deducations:number;
  number_of_days:number;
  minDate;
  maxDateYear;
  editDeducation:boolean=false;
  target_date:any;
  formData;
  step:number=1;
  settings;

  deductions;
  
  //submitted?:boolean=false;

  constructor(private formDataService:SavingGoalFormDataService,
    private router:Router, private savingService:SavingService, 
    private savingDataService:SavingGoalDataService,  private globalSettings:GlobalConfigDataService) { }

  ngOnInit() {
    //this.savingGoalForm = createSavingForm(this.formbuilder, this.savingGoalInstance);
    this.today = new Date();
    this.minDate = new Date();
    //console.log(this.savingGoalInstance, this.savingGoalForm.value);
    this.minDate.setDate(this.today.getDate() + 14);   
    this.maxDateYear = this.today.getYear() + 1901;
    console.log(this.maxDateYear);
    this.number_of_days = Math.floor((new Date(this.savingGoalForm.value.target_date).getTime() - this.today.getTime())/(24*60*60*1000));    
    this.calculateDeductionAmount(null);

    this.globalSettings.dataSource.subscribe((res)=>{
      this.settings = res;
      console.log('settings', res);
    })

  }
  prevStep(event){
    if(this.step>1)this.step -=1;
  }
  nextStep(event){
    if(this.step==2 && this.deductionAmount < 2){
      console.log(this.deductionAmount);
      return;
    }
    if(this.step<3)this.step+=1;
  }

  setTimeline(days){
    let temp_date = new Date();
    temp_date.setDate( temp_date.getDate() + days + 1 );
    this.savingGoalForm.controls.target_date.setValue(temp_date.toISOString());
    this.savingGoalForm.value.target_date = temp_date.toISOString().split('T')[0];
    this.calculateDeductionAmount(null);
  }

  nextDisabled(){
    const controls = this.savingGoalForm.controls;
    if(this.step === 1){
      return controls.title.status === 'INVALID' || controls.target_amount.status === 'INVALID' 
      || (parseInt(controls.target_amount.value) < MIN_DEPOSIT_AMOUNT || parseInt(controls.target_amount.value) > MAX_DEPOSIT_AMOUNT ) ;
    }
    else if(this.step === 2){
      return controls.target_date.status === 'INVALID' || controls.deposit_frequency.status === 'INVALID' 
      || controls.deduction_amount.status === 'INVALID';      
    }
    else if(this.step === 3){
      return controls.deduction_mode === 'INVALID';
    }
    return false;
  }

  calculateDeductionAmount(event,){
    this.number_of_days = Math.floor((new Date(this.savingGoalForm.value.target_date).getTime() - this.today.getTime())/(24*60*60*1000));
    this.number_of_deducations = Math.floor(this.number_of_days/this.savingGoalForm.value.deposit_frequency);
    this.deductionAmount = (this.savingGoalForm.value.target_amount - (this.savingGoalForm.value.current_deposit||0))/this.number_of_deducations;

    if(this.settings){
      const daily = this.calculateDeductionAmountFor(1);
      const weekly = this.calculateDeductionAmountFor(7);
      const monthly = this.calculateDeductionAmountFor(30);
      this.deductions = {
        'daily': daily >= this.settings.minDeductionAmount ? daily : null ,
        'weekly': weekly >= this.settings.minDeductionAmount ? weekly : null ,
        'monthly': monthly >= this.settings.minDeductionAmount ? monthly : null
      }
      console.log(this.deductions);
    }
  }

  calculateDeductionAmountFor(frequency){
    let number_of_deducations = this.getNumberOferDeducations(frequency);
    return (this.savingGoalForm.value.target_amount - (this.savingGoalForm.value.current_deposit||0))/number_of_deducations;
  }

  getNumberOferDeducations(frequency){
    let number_of_days = Math.floor((new Date(this.savingGoalForm.value.target_date).getTime() - this.today.getTime())/(24*60*60*1000));
    let number_of_deducations = Math.floor(number_of_days/frequency);
    return number_of_deducations;
  }

  toggleEditDeducationInput(){
    this.editDeducation = !this.editDeducation;
  }  
  
  onSubmit(){
    this.savingGoalFormData.emit(this.savingGoalForm);
  }

}
