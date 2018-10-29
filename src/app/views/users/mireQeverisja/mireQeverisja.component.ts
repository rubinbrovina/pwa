import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/postService.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-mireQeverisja',
  templateUrl: './mireQeverisja.component.html',
  styleUrls: ['./mireQeverisja.component.scss']
})
export class MireQeverisjaComponent implements OnInit {

  value1 = new Date("2018-10-10").valueOf();
  value2 = new Date().valueOf();
  MEPJ; MSHMS; MD; MM; MB; MASR; MK; MTM; MIE; MFE; MBZHR;totalComment;
  fbShare; fbLike; twShare; twLike; whShare; insLove; totalShare; totalLike;
  totalUsers;
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getGovActivity(this.value1, this.value2).subscribe((x) => {
      this.MEPJ = x[0]
      this.MFE = x[1]
      this.MIE = x[2]
      this.MTM = x[3]
      this.MASR = x[4]
      this.MB = x[5]
      this.MBZHR = x[6]
      this.MD = x[7]
      this.MK = x[8]
      this.MSHMS = x[9]
      this.MM = x[10]
      
      this.totalComment = x.reduce(function (acc, obj) { return acc + obj.comments; }, 0)
      this.fbShare = x.reduce(function (acc, obj) { return acc + obj.fbShare; }, 0)
      this.fbLike = x.reduce(function (acc, obj) { return acc + obj.fbLike; }, 0)
      this.twShare = x.reduce(function (acc, obj) { return acc + obj.twShare; }, 0)
      this.twLike = x.reduce(function (acc, obj) { return acc + obj.twLike; }, 0)
      this.whShare = x.reduce(function (acc, obj) { return acc + obj.whShare; }, 0)
      this.insLove = x.reduce(function (acc, obj) { return acc + obj.insLove; }, 0)
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
     this.service.getGovActivity(firstDate, this.value2).subscribe(x=>{
      this.MEPJ = x[0]
      this.MFE = x[1]
      this.MIE = x[2]
      this.MTM = x[3]
      this.MASR = x[4]
      this.MB = x[5]
      this.MBZHR = x[6]
      this.MD = x[7]
      this.MK = x[8]
      this.MSHMS = x[9]
      this.MM = x[10]
      this.totalComment = x.reduce(function (acc, obj) { return acc + obj.comments; }, 0)
      this.fbShare = x.reduce(function (acc, obj) { return acc + obj.fbShare; }, 0)
      this.fbLike = x.reduce(function (acc, obj) { return acc + obj.fbLike; }, 0)
      this.twShare = x.reduce(function (acc, obj) { return acc + obj.twShare; }, 0)
      this.twLike = x.reduce(function (acc, obj) { return acc + obj.twLike; }, 0)
      this.whShare = x.reduce(function (acc, obj) { return acc + obj.whShare; }, 0)
      this.insLove = x.reduce(function (acc, obj) { return acc + obj.insLove; }, 0)
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove
    })
  }
  
  getSecondDate(e){
    let secondDate = new Date(e.value).valueOf()
   this.service.getGovActivity(this.value1, secondDate).subscribe(x=>{
    this.MEPJ = x[0]
    this.MFE = x[1]
    this.MIE = x[2]
    this.MTM = x[3]
    this.MASR = x[4]
    this.MB = x[5]
    this.MBZHR = x[6]
    this.MD = x[7]
    this.MK = x[8]
    this.MSHMS = x[9]
    this.MM = x[10]
    this.totalComment = x.reduce(function (acc, obj) { return acc + obj.comments; }, 0)
    this.fbShare = x.reduce(function (acc, obj) { return acc + obj.fbShare; }, 0)
    this.fbLike = x.reduce(function (acc, obj) { return acc + obj.fbLike; }, 0)
    this.twShare = x.reduce(function (acc, obj) { return acc + obj.twShare; }, 0)
    this.twLike = x.reduce(function (acc, obj) { return acc + obj.twLike; }, 0)
    this.whShare = x.reduce(function (acc, obj) { return acc + obj.whShare; }, 0)
    this.insLove = x.reduce(function (acc, obj) { return acc + obj.insLove; }, 0)
    this.totalShare = this.fbShare + this.whShare + this.twShare
    this.totalLike = this.fbLike + this.twLike + this.insLove
    })
  }

}
