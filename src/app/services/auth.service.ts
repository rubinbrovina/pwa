import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LowerCasePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl + "auth/sign_in"
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  lowercase = new LowerCasePipe();
  constructor(private http: HttpClient) {}

  login(model: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-type','application/x-www-form-urlencoded')
    let body = `username=${this.lowercase.transform(model.username)}&password=${model.password}`;
    return this.http.post(this.baseUrl, body, {headers: headers}).pipe(
    map((response: any) => { 
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
       localStorage.setItem('facebookID', this.decodedToken.facebookID)
        localStorage.setItem('twitterID', this.decodedToken.twitterID)
        localStorage.setItem('group', JSON.stringify(this.decodedToken.groupUUIDS))
        localStorage.setItem('room', JSON.stringify(this.decodedToken.roomUUIDS))
      }
    })
    )
  }
 
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
