import { Component, OnInit } from '@angular/core';
import { AspirationDataService } from '../aspiration-data.service';
import { Router } from '@angular/router';
import { AspirationModel } from './aspiration.model';
import { ApiService } from '../../../services/core/api.service';
import { AspirationService } from 'src/app/services/aspiration.service';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-aspiration-detail',
  templateUrl: './aspiration-detail.page.html',
  styleUrls: ['./aspiration-detail.page.scss'],
})
export class AspirationDetailPage implements OnInit {

  subscriptions = [];
  aspiration:AspirationModel;
  constructor(private aspirationDataService:AspirationDataService, private _router:Router,
    private aspirationService:AspirationService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.aspirationDataService.dataSource.subscribe(data =>{
        this.aspiration = data;
        const subscription = this.aspirationService.getDetail(data.pk).subscribe(data =>{
          console.log(data, 'aspiration.... subscription.....');
          this.aspiration = data;
          this.subscriptions.forEach(subscription=>subscription.unsubscribe());
          this.aspirationDataService.setData(data);
          subscription.unsubscribe();
        })
      })
    )
  }

  createSaving(event){
    this.aspirationService.followAspiration(this.aspiration.pk);
    this._router.navigate(['/create-saving']);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
