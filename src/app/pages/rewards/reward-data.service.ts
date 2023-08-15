import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Reward } from './rewards.model';


@Injectable({
    providedIn: 'root',
  })
export class RewardDataService{ 

    dataSource = new BehaviorSubject(new Reward());
    data = this.dataSource.asObservable();
    constructor(){}

    setData(data){        
      this.dataSource.next(data);
    }

}