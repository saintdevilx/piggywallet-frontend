import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

@Injectable()
export class ApiService {
  
  constructor(private platform: Platform, private http: HttpClient) {

  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.API_URL}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, options={}): Observable<any> {
    return this.http.put(
      `${environment.API_URL}${path}`,
      body,
      options
    ).pipe(catchError(this.formatErrors));
  }

  raw_post(url:string, body, options={}): Observable<any>{
    return this.http.post(url, body, options);
  }

  post(path: string, body: Object = {}, options:any={}): Observable<any> {
    return this.http.post(
      `${environment.API_URL}${path}`,
      body,
      options
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.API_URL}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  _fetch(url){
    //return this.http.get(`${url}`).pipe(catchError(this.formatErrors));
    return fetch(url);
  }
}