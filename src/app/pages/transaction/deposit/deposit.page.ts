import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SavingService } from 'src/app/services/saving.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  // savingGoalForm:any;
  // savingGoalInstance:SavingGoal;
  // savingAmount:number;
  // frequency:number;
  // today;
  // deductionAmount:any;
  // timeline;
  // number_of_deducations;
  // number_of_days;
  // minDate;
  // editDeducation:boolean=false;
  // target_date:any;
  // formData;
  // submitted:boolean=false;
  // constructor(public formbuilder:FormBuilder, private formDataService:SavingGoalFormDataService,
  //   private router:Router, private savingService:SavingService) { }

  ngOnInit() {
    // this.savingGoalInstance = new SavingGoal();
    // this.savingGoalForm = createSavingForm(this.formbuilder, this.savingGoalInstance);
    // this.today = new Date();
    // this.minDate = this.today.getDate() + 14;    
  }

  // onSubmit(){
  //   console.log('onsubmit', this.savingGoalForm.value);
  //   this.submitted=true;
  //   //this.formDataService.setData(this.savingGoalForm.value);
  //   this.savingService.createSavingGoal(this.savingGoalForm.value).subscribe(
  //     data=>{
  //       this.savingGoalForm.reset();
  //       this.submitted = false;
  //       this.router.navigate(['/payment']);
  //     },
  //     err => {
  //       this.submitted = false;
  //     }
  //   );    
  // }

  // calculateDeductionAmount(event){
  //   this.number_of_days = Math.floor((new Date(this.savingGoalForm.value.target_date).getTime() - this.today.getTime())/(24*60*60*1000));
  //   this.number_of_deducations = Math.floor(this.number_of_days/this.savingGoalForm.value.frequency);
  //   this.deductionAmount = this.savingAmount/this.number_of_deducations;
  // }

  // toggleEditDeducationInput(){
  //   this.editDeducation = !this.editDeducation;
  // }

}
