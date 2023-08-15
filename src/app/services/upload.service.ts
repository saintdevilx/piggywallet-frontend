import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService:ApiService, private http: HttpClient){}

  uploadToS3(body, presignedUrl:string){  
    return this.apiService.raw_post(presignedUrl, body);   
  }  
  
}
