import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/postService.service';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fullViewOfShare',
  templateUrl: './fullViewOfShare.component.html',
  styleUrls: ['./fullViewOfShare.component.scss'],
  providers: [ PostService ]
})
export class FullViewOfShareComponent implements OnInit {

  uuid;
  postimi;
  baseUrl= environment.baseUrl;
  constructor(private activeRoute: ActivatedRoute, private _postService:PostService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    const routeParams = this.activeRoute.snapshot.params;
    this.uuid=routeParams.uuid;
    this._postService.getSpecificPost(this.uuid).subscribe(x => {
      this.spinner.hide();
      this.postimi=x["Post"][0]
  })
  }
}
