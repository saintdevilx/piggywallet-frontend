import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SavingGoalModel } from '../saving-goal/create-saving//model';


@Injectable({
    providedIn: 'root',
  })
export class SavingGoalDataService{ 

    dataSource = new BehaviorSubject(new SavingGoalModel({}));
    data = this.dataSource.asObservable();
    constructor(){}

    setData(data){        
      this.dataSource.next(data);
    }
    // getData(){
    //     this.formDataSource.subscribe(data=>);
    // }
}