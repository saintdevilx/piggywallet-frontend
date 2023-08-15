import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SavingGoalModel } from '../saving-goal/create-saving/model';

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService {
  dataSource = new BehaviorSubject(new SavingGoalModel({}));
  data = this.dataSource.asObservable();
  constructor(){}

}
