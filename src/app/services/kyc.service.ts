import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class KYCService {

    constructor(private apiRequest:ApiService) {}

    updateKYCDetail(body): Observable<any>{       
        return this.apiRequest.raw_post(`${environment.API_URL}user/user-kyc/`, body);
    }

    getKYCDetail(): Observable<any>{
        return this.apiRequest.get('user/user-kyc/')
    }

}