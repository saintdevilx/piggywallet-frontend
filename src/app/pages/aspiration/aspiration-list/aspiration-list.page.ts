import { Component, OnInit } from '@angular/core';
import { AspirationService } from 'src/app/services/aspiration.service';
import { AspirationModel } from '../aspiration-detail/aspiration.model';
import { Router } from '@angular/router';
import { AspirationDataService } from '../aspiration-data.service';

@Component({
  selector: 'app-aspiration-list',
  templateUrl: './aspiration-list.page.html',
  styleUrls: ['./aspiration-list.page.scss'],
})
export class AspirationListPage implements OnInit {

  page:number=1;
  aspirations:Array<AspirationModel> = null;
  hasMore:boolean;
  subscription;
  constructor(private aspirationService:AspirationService, private _router:Router,
    private aspirationDataService:AspirationDataService) { }

  ngOnInit() {
    this.onRefresh(null);
  }

  onRefresh(event){
    this.hasMore = true;
    this.page = 1;
    this.loadMoreData(event, true);
  }

  loadMoreData(event, refresh=false){
    if(this.subscription)this.subscription.unsubscribe();
    if(!refresh && !this.hasMore)return;    
    console.log(this.page ,refresh);
    this.subscription = this.aspirationService.getList(this.page).subscribe(data => {
      if(refresh) this.aspirations = [];
      this.aspirations = this.aspirations.concat(data.results);
      console.log(this.aspirations, data);
      this.hasMore=data.has_next;
      this.page=data.next_page_number || this.page + 1;
      if(event)event.target.complete();
    });
  }

  viewAspirationDetail(aspiration){
    this.aspirationDataService.setData(aspiration)
    this._router.navigate(['/aspiration-detail']);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
