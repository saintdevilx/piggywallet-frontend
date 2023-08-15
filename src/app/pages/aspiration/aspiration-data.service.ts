import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AspirationModel } from './aspiration-detail/aspiration.model';

@Injectable({
  providedIn: 'root'
})
export class AspirationDataService {

  dataSource = new BehaviorSubject(new AspirationModel({}));
  data = this.dataSource.asObservable();
  constructor(){}
  
  setData(data){        
    this.dataSource.next(data);
  }
}
