import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/postService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '../../../services/Alertify.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-fullViewOfComment',
  templateUrl: './fullViewOfComment.component.html',
  styleUrls: ['./fullViewOfComment.component.scss'],
  providers: [ PostService, AlertifyService ]
})
export class FullViewOfCommentComponent implements OnInit {

  uuid;
  postimi;
  baseUrl = environment.baseUrl;

  shtoDheKomentoForm = new FormGroup({
    nickname: new FormControl('', Validators.required),
    koment: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private activeRoute: ActivatedRoute, private _postService:PostService, private alertify:AlertifyService) { }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.uuid=routeParams.uuid;
    this._postService.getSpecificPost(this.uuid).subscribe(x => {
      this.postimi=x["Post"][0]
      
  })
  }

  dergoLexoDheKomento(){
    this._postService.addCommentToPost(this.shtoDheKomentoForm.value, this.uuid).subscribe(
      x => {
        
        if(x["aa"]){
          this.alertify.success("Komenti shkoi me sukses")
        }else {this.alertify.error("Provoni përsëri")}
      }
    );
  }
}
