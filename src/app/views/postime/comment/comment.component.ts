import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/postService.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [ PostService ]
})
export class CommentComponent implements OnInit {

  posts = new Array().fill('');
  returnedArray;
  sortedArray;
  smallnumPages = 0;
  baseUrl = environment.baseUrl;
  constructor(private _postService:PostService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this._postService.getAllPostsComment().subscribe(
      x=> {
      this.posts=x["Room"]["0"]["posts"]
      this.sortedArray = this.posts.sort(function(a,b){
        a = a.datetime
        b = b.datetime
        if(a<b){
          return 1;
        }
        if(a>b){
          return -1;
        }
        return 0
      })
    },
      error=> {console.log(error)},
      ()=> {
        this.returnedArray = this.sortedArray.slice(0, 8),
        this.spinner.hide()
      });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page -1) * 8;
    const endItem = event.page * 8 ;
    this.returnedArray = this.sortedArray.slice(startItem, endItem);
  }

}
