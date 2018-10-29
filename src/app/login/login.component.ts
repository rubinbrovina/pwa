import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/Alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  model: any = {};

  constructor( 
    private authService: LoginService, 
    private router: Router, 
    private alertify: AlertifyService, 
    private acroute: ActivatedRoute
    ){}

    ngOnInit(){
      localStorage.clear();
    }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('U loguat me sukses');
    }, error => {
      console.log(error)
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/']);
    });
  }

 }


