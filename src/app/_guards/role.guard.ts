import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../services/Alertify.service';
import { LoginService } from '../services/auth.service';
@Injectable()
export class RoleGuard implements CanActivate {
    tokenPayload = new Array;
    expectedRole = new Array;
    constructor(public auth: LoginService, public router: Router, private alertify: AlertifyService) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {

        // this will be passed from the route config
        // on the data property

        this.expectedRole = route.data.expectedRole;

        // decode the token to get its payload
        
        this.tokenPayload = JSON.parse(localStorage.getItem('group'));
        if (
            this.auth.loggedIn() && (
                this.tokenPayload.indexOf(this.expectedRole[0]) < 0 &&
                this.tokenPayload.indexOf(this.expectedRole[1]) < 0)
        ) {
            this.alertify.error('Llogaria juaj nuk ofron aksesin ne kete seksion!');
             this.router.navigate(['/']); 
            return false;
        }
        return true;
    }
}