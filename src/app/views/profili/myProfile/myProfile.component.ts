import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PostService } from '../../../services/postService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../../services/Alertify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Qarqet, Bashkite} from '../../../../assets/data';

@Component({
  selector: 'app-myProfile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.scss']
})
export class MyProfileComponent implements OnInit {

  @ViewChild('changePassword') changePassword: ModalDirective;

  Qarqet=Qarqet;
  Bashkite=Bashkite;

  url="./assets/img/220px-User_icon_2.svg.png";
  jwtHelper = new JwtHelperService();
  User: any={};
  constructor(private userService: PostService, private _postService:PostService, private alertify: AlertifyService, private spinner: NgxSpinnerService) { }

  changePasswordForm = new FormGroup({
    passworldOld: new FormControl('', Validators.required),
    passworldNew: new FormControl('', Validators.required),
    passworldNewRepeat: new FormControl('', Validators.required)
  })

  ngOnInit() {
  this.userService.getProfiliImUser().subscribe(x=>
    {
      this.User = x["User"]["0"];
     })
  }

  ruajNdryshimetProfiliIm(){
    this.spinner.show();
    this._postService.saveProfiliImUser(this.User).subscribe(
      x=> {
        this.spinner.hide();
        if(x["updateUser"]){
          this.alertify.success("Ndryshimi u krye me sukses")
        }else{
          this.alertify.error("Ndryshimi nuk u krye")
        }
      }
    )
  }

  openChangePassword(){
    this.showChangePasswordModal();
  }

  changeOldPassword(){
    this.spinner.show();
    this._postService.changePass(this.User, this.changePasswordForm.value).subscribe(
      x=>{this.spinner.hide(), this.alertify.success("Passwordi u ndryshua me sukses")},
      error=> {this.spinner.hide(), this.alertify.error("Passwordi nuk u ndryshua")},
      ()=> {this.hideChangePasswordModal(), this.changePasswordForm.reset()}
    );
  }

  readUrl(event: any){
   
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onChange(qarku) {
    this.Bashkite=Bashkite
    this.Bashkite= this.Bashkite.filter(x=> qarku== x.idQarku)
}

  showChangePasswordModal(): void {
    this.changePassword.show();
  }
 
  hideChangePasswordModal(): void {
    this.changePassword.hide();
  }

}
