import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SavingGoal, SavingGoalModel } from 'src/app/pages/saving-goal/create-saving/model';

@Component({
  selector: 'app-saving-card',
  templateUrl: './saving-card.component.html',
 // styleUrls: ['./saving-card.component.scss'],
})
export class SavingCardComponent implements OnInit {

  @Input() savingGoal:SavingGoalModel;
  @Input() className:string="";
  ngOnInit() {}
}