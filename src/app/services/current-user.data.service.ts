import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../pages/saving-goal/create-saving/model';


@Injectable({
    providedIn: 'root',
  })
export class CurrentUserDataService{ 

    dataSource = new BehaviorSubject(new User);
    data = this.dataSource.asObservable();
    constructor(){}

    setData(data){        
      if(data===null)data = new User();
      this.dataSource.next(data);
    }
    // getData(){
    //     this.formDataSource.subscribe(data=>);
    // }
}