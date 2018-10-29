import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'
import { LoginService } from '../services/auth.service';
import { AlertifyService } from '../services/Alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService,
    private router: Router,
    private alertify: AlertifyService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.loggedIn()) {
      return true;
    } 
    this.alertify.warning("Ju lutem logohuni");
      this.router.navigate(['/login']);
      return false;
  }
}