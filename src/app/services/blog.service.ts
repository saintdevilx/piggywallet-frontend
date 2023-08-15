import { ApiService } from './core/api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class BlogPost{
    date:string;
    slug:string;
    status:string;
    type:string;
    link:Object;
    content:Object;
    featured_image:Object;
    category:Object;
    excerpt:Object;    
}

@Injectable({
    providedIn: 'root'
  })
export class BlogService {
    constructor(private apiService:ApiService){}
    
    getPostsList(){
        return this.apiService._fetch(`https://${environment.WEBSITE_DOMAIN}/index.php/wp-json/wp/v2/posts?_embed&order=desc&orderby=modified`);
    }
}