import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../../services/postService.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../../services/Alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readAndComment',
  templateUrl: './readAndComment.component.html',
  styleUrls: ['./readAndComment.component.scss'],
  providers: [ PostService, AlertifyService ]
})
export class ReadAndCommentComponent implements OnInit {

  imageUrl = environment.baseUrl + "upload";
  image: File;
  imageUuid;
  sendReadAndCommentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    PS: new FormControl(''),
    FRESH: new FormControl(''),
    QEVERI: new FormControl('')
  })
  url = 'assets/img/feature.png';
  showUrl: boolean = false;

  constructor(private _postService:PostService, private http: HttpClient, 
    private router: Router,
    private alertify:AlertifyService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Teksti i postimit',
    translate: 'no'
  }

  publiko(){
    this.spinner.show()
    this._postService.postComment(this.sendReadAndCommentForm.value, this.imageUuid).subscribe(
      x => {
        if(x["aa"]){
          this.spinner.hide()        
          this.alertify.success("U krijua me sukses")
          this.router.navigate(['/actions/managePosts'])
        }else {this.alertify.error("Nuk u krijua me sukses"), this.spinner.hide()}
      }
    )
  }

  saveDraft(){
    // console.log(this.sendReadAndCommentForm.value)
    // console.log(this.sendReadAndCommentForm.get('image').value)
  }

  readUrl(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.image=event.target.files[0];
      this.showUrl = true;
      let formData:FormData = new FormData();
      formData.append('files',this.image);
      this.http.post(this.imageUrl, formData).subscribe(x => this.imageUuid=x[0].uuid)
    }
  }

  hiqFoto(e){
    this.sendReadAndCommentForm.get('image').setValue('');
    this.showUrl = false;
  }

}
