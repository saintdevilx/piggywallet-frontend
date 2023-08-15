import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { OfferDetail } from 'src/app/pages/rewards/rewards.model';


@Injectable({
    providedIn: 'root',
  })
export class OfferDetailDataService{ 

    dataSource = new BehaviorSubject(new OfferDetail());
    data = this.dataSource.asObservable();
    constructor(){}

    setData(data){        
      this.dataSource.next(data);
    }

}