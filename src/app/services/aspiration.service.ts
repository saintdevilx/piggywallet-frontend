import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { Observable } from 'rxjs';
import { PaginatedResult } from './core/base.model';
import { AspirationModel } from '../pages/aspiration/aspiration-detail/aspiration.model';

@Injectable({
  providedIn: 'root'
})
export class AspirationService {

  constructor(private apiService:ApiService) { }

  getList(page=1, pageSize=10): Observable<PaginatedResult<AspirationModel>>{
    return this.apiService.get(`aspiration/?page=${page}&page_size=${pageSize}`);
  }

  getDetail(pk:string): Observable<AspirationModel>{
    return this.apiService.get(`aspiration/${pk}/`);
  }

  followAspiration(pk:string){
    return this.apiService.post(`aspiration/${pk}`)
  }

}
