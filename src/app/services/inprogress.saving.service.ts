import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SavingGoalModel } from '../pages/saving-goal/create-saving/model';


@Injectable({ providedIn: 'root' })
export class InProgressSavingService {
    dataSource = new BehaviorSubject({'results':[new SavingGoalModel({})],'hasNext':false});
    savingGoals = this.dataSource.asObservable();

    constructor(){}

    setData(data){        
      if(data===null)data = {'results':[new SavingGoalModel({})],'hasNext':false}
      this.dataSource.next(data);
    }

    append(savingGoal){
    }
}