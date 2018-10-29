import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from '../../../services/postService.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ng2-facebook-sdk';
import { AuthService, FacebookLoginProvider } from 'angular-6-social-login';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';
import { AlertifyService } from '../../../services/Alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  providers: [PostService]
})
export class ShareComponent implements OnInit {
  token;
  posts = new Array().fill('');
  sortedPosts
  returnedArray;
  smallnumPages = 0;
  hide = true;
  modalRef: BsModalRef;
  fblogged: boolean = false;
  fbid;
  baseUrl = environment.baseUrl;
  constructor(private _postService: PostService, 
    private http:HttpClient,
    private fb: FacebookService,
    private socialAuthService: AuthService,
    private modalService: BsModalService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {
    let initParams: InitParams = {
      appId: '204299226936919',
      xfbml: true,
      version: 'v3.1'
    };
    fb.init(initParams);
  }

  ngOnInit() {
    /* this.spinner.show() */
    this._postService.getAllPostsShareable().subscribe(
      x => {
        this.posts=x["Room"]["0"]["posts"]
        this.sortedPosts = this.posts.sort(function(a,b){
          a = a.datetime
          b = b.datetime
          if (a > b) {
            return -1;
        }
    
        if (a < b) {
            return 1;
        }
    
        return 0;
        })
      },
      error => { console.log(error) },
      () => {
        this.returnedArray = this.sortedPosts.slice(0, 8);
        this.spinner.hide()
      });

    this.fbid = localStorage.getItem('facebookID')
    if (this.fbid == "null") { this.fblogged = false }
    else { this.fblogged = true }
  }

  //share with fb 
  shareFacebook(uuid: string) {
/*     this.fbid = localStorage.getItem('facebookID')
    let params: UIParams = {
      href: url,
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => {
        if (res == "") {
          //give points for sharing
          let body = `postUUID=${uuid}&typeOfShare=${1}&fbId=${this.fbid}`;
         let headers = new HttpHeaders;
          headers = headers.append('Content-type','application/x-www-form-urlencoded')
          this.http.post(this.baseUrl + 'sharedPost', body, {headers:headers}).subscribe(e => this.alertify.success("U postua me sukses")),
            error => {
              this.alertify.error(error)
            }
        } else {
          this.alertify.error("Nuk u postua me sukses")
        }
      })
      .catch((error: any) => this.alertify.error(error)); */
      this.fbid = localStorage.getItem('facebookID')
      let body = `postUUID=${uuid}&typeOfShare=${1}&fbId=${this.fbid}`;
      let headers = new HttpHeaders;
       headers = headers.append('Content-type','application/x-www-form-urlencoded')
       this.http.post(this.baseUrl + 'sharedPost', body, {headers:headers}).subscribe(e => console.log(e)),
         error => {
           this.alertify.error(error)
         }
  }

  shareTwitter(uuid: string) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-type','application/x-www-form-urlencoded')
    let body = `postUUID=${uuid}&typeOfShare=${2}`;
    this.http.post(this.baseUrl + 'sharedPost', body, {headers: headers}).subscribe(e => this.alertify.success("U postua me sukses")),
      error => {
        this.alertify.error(error)
      }
  }
  shareWhatsapp(uuid: string) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-type','application/x-www-form-urlencoded')
    let body = `postUUID=${uuid}&typeOfShare=${3}`;
    this.http.post(this.baseUrl + 'sharedPost', body, {headers:headers}).subscribe(e => this.alertify.success("U postua me sukses")),
      error => {
        this.alertify.error(error)
      }
  }
  likeFacebook(uuid: string) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-type','application/x-www-form-urlencoded')
    let body = `postUUID=${uuid}&typeOfShare=${4}`;
    this.http.post(this.baseUrl + 'sharedPost', body, {headers:headers}).subscribe(e => this.alertify.success("U postua me sukses")),
      error => {
        this.alertify.error(error)
      }
  }
  likeTwitter(uuid: string) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-type','application/x-www-form-urlencoded')
    let body = `postUUID=${uuid}&typeOfShare=${5}`;
    this.http.post(this.baseUrl + 'sharedPost', body, {headers:headers}).subscribe(e => this.alertify.success("U postua me sukses")),
      error => {
        this.alertify.error(error)
      }
  }
  likeInstagram(uuid: string) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-type','application/x-www-form-urlencoded')
    let body = `postUUID=${uuid}&typeOfShare=${6}`;
    this.http.post(this.baseUrl + 'sharedPost', body, {headers:headers}).subscribe(e => this.alertify.success("U postua me sukses")),
      error => {
        this.alertify.error(error)
      }
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * 8;
    const endItem = event.page * 8;
    this.returnedArray = this.sortedPosts.slice(startItem, endItem)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //login with facebook
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        localStorage.setItem('facebookID', userData.id)
        let body = `facebookID=${userData.id}&email=${userData.email}&name=${userData.name}&image=${userData.image}`;
       let headers = new HttpHeaders;
       headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.baseUrl + 'socialConnect', body, {headers:headers})
          .toPromise()
          .then(response => {
            this.alertify.success("Logimi u krye me sukses!")
            this.fblogged = true;
            this.modalRef.hide();
          })
          .catch((res) => console.log(res));
        // Now sign-in with userData
        // ...
      }
    ).catch(error => this.alertify.error(error));
  }
}
