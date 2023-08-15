import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GlobalConfig } from 'src/app/utils/global.settings';

@Injectable({
    providedIn: 'root',
  })
export class GlobalConfigDataService{ 

    dataSource = new BehaviorSubject(new GlobalConfig);
    data = this.dataSource.asObservable();
    constructor(){}

    setData(data){        
      if(data===null)data = new GlobalConfig();
      this.dataSource.next(data);
    }
    // getData(){
    //     this.formDataSource.subscribe(data=>);
    // }
}