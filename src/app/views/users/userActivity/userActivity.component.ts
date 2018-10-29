import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { PostService } from '../../../services/postService.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
  selector: 'app-userActivity',
  templateUrl: './userActivity.component.html',
  styleUrls: ['./userActivity.component.scss']
})
export class UserActivityComponent implements OnInit {
  uuid;
  User = new Array;
  returnedArray;
  sortedArray;
  UserActivities = new Array().fill('');
  twitterShareArray = new Array;
  fbShareArray = new Array;
  whatsappShareArray = [];
  fblikeArray=new Array;
  twitterLikeArray = new Array;
  instaLikeArray = new Array;
  commentsArray = new Array;
  logingsArray= new Array;
  constructor(private route: ActivatedRoute, private http: Http, private userService: PostService) { }

  ngOnInit() {
    /* Get Activities */
    this.route.params.subscribe(x =>{this.uuid = x.uuid });
    this.userService.getUser(this.uuid).subscribe(res => {
     this.User = (res as any).User[0]
      
      /* Share Facebook */
     this.fbShareArray = (res as any).User[0].facebookSharebles
     this.fbShareArray.map((obj)=>
       obj.tipi = 1
     )
     /* Share Twitter */
     this.twitterShareArray = (res as any).User[0].twitterSharebles
     this.twitterShareArray.map((obj)=>
     obj.tipi = 2
     )
     /* Share Whatsapp */
     this.whatsappShareArray = (res as any).User[0].whatsappSharebles
     this.whatsappShareArray.map((obj)=>
     obj.tipi = 3
     )
     /* Like Facebook */
     this.fblikeArray = (res as any).User[0].facebookLike
     this.fblikeArray.map((obj)=>
     obj.tipi = 4
     )
     /* Like Instagram */
     this.instaLikeArray = (res as any).User[0].instaLove
     this.instaLikeArray.map((obj)=>
     obj.tipi = 5
     )
     /* Like Twitter */
     this.twitterLikeArray = (res as any).User[0].twitLove
     this.twitterLikeArray.map((obj)=>
     obj.tipi = 6
     )
     /* Comments */
     this.commentsArray = (res as any).User[0].comments
     this.commentsArray.map((obj)=>
     obj.tipi = 7
     )
     /* Get Logins */
      this.logingsArray = (res as any).User[0].activity
      this.logingsArray.map((obj)=>
      obj.tipi = 8
      )
     /* Merge Arrays */
     this.UserActivities = [
       ...this.logingsArray,
       ...this.fbShareArray,
       ...this.twitterShareArray,
       ...this.whatsappShareArray,
       ...this.fblikeArray,
       ...this.twitterLikeArray,
       ...this.instaLikeArray,
       ...this.commentsArray
     ]
     /* Slice and Sort Array for pagination */
   
    this.sortedArray = this.UserActivities.sort(function(a, b){
      a = a.datetime
      b = b.datetime
      if (a > b) {
        return -1;
    }

    if (a < b) {
        return 1;
    }

    return 0;
    });
    this.returnedArray = this.sortedArray.slice(0,8)
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * 8;
    const endItem = event.page * 8;
    this.returnedArray = this.sortedArray.slice(startItem, endItem);
  }
}
