import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
    constructor(private router: Router, private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getcurrentUserValue();
        console.log('can activae', currentUser, state);
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log(state, this);
        this.router.navigate(['/registration'], { skipLocationChange:true , queryParams: { returnUrl: state.url }});
        return false;
    }
}
