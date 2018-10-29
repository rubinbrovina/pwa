import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/postService.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-fressh',
  templateUrl: './fressh.component.html',
  styleUrls: ['./fressh.component.scss']
})
export class FresshComponent implements OnInit {

  value1 = new Date("2018-10-10").valueOf();
  value2 = new Date().valueOf();
  totalComment;
  fbShare; fbLike; twShare; twLike; whShare; insLove; totalShare; totalLike;
  totalUsers;
  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getFreshActivity(this.value1, this.value2).subscribe((x) => {
      console.log(x)
      this.fbShare = x[0].fbShare
      this.fbLike = x[0].fbLike
      this.twShare = x[0].twShare
      this.whShare = x[0].whShare
      this.twLike = x[0].twLike
      this.insLove = x[0].insLove
      this.totalComment = x[0].comments
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove
      this.totalUsers = x[0].totalUsers
    })
  }
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 250;    
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      }); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }
  getFirstDate(e){
    let firstDate = new Date(e.value).valueOf()
     this.service.getFreshActivity(firstDate, this.value2).subscribe(x=>{
      
      this.fbShare = x[0].fbShare
      this.fbLike = x[0].fbLike
      this.twShare = x[0].twShare
      this.whShare = x[0].whShare
      this.twLike = x[0].twLike
      this.insLove = x[0].insLove
      this.totalComment = x[0].comments
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove
      this.totalUsers = x[0].totalUsers
    })
  }
  
  getSecondDate(e){
    let secondDate = new Date(e.value).valueOf()
   this.service.getFreshActivity(this.value1, secondDate).subscribe(x=>{
   
    this.fbShare = x[0].fbShare
      this.fbLike = x[0].fbLike
      this.twShare = x[0].twShare
      this.whShare = x[0].whShare
      this.twLike = x[0].twLike
      this.insLove = x[0].insLove
      this.totalComment = x[0].comments
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove
      this.totalUsers = x[0].totalUsers
    })
  }

}
