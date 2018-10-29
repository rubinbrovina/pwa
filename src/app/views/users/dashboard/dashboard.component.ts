
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/postService.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  selector: 'app-dashboard',
})
export class DashboardComponent implements OnInit {

  data;totalShare;totalLike; totalComment;totalLogine;
  fbShare; fbLike; twShare; twLike; whShare; insLove;totalUsers;
  value1 = new Date("2018-10-10").valueOf();
  value2 = new Date().valueOf();

  constructor(private userService: PostService){
  
    userService.getAllActivity(this.value1,this.value2).subscribe(x => {
      this.data = x
      this.totalUsers = this.data[0].totalUsers
      this.fbShare = x.reduce(function (acc, obj) { return acc + obj.fbShare; }, 0)
      this.fbLike = x.reduce(function (acc, obj) { return acc + obj.fbLike; }, 0)
      this.twShare = x.reduce(function (acc, obj) { return acc + obj.twShare; }, 0)
      this.twLike = x.reduce(function (acc, obj) { return acc + obj.twLike; }, 0)
      this.whShare = x.reduce(function (acc, obj) { return acc + obj.whShare; }, 0)
      this.insLove = x.reduce(function (acc, obj) { return acc + obj.insLove; }, 0)
      this.totalComment = x.reduce(function (acc, obj) { return acc + obj.comments; }, 0)
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove
    })
  }
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
  
  getFirstDate(e){
    let firstDate = new Date(e.value).valueOf()
     this.userService.getAllActivity(firstDate, this.value2).subscribe(x=>{
      this.data=x
      this.fbShare = x.reduce(function (acc, obj) { return acc + obj.fbShare; }, 0)
      this.fbLike = x.reduce(function (acc, obj) { return acc + obj.fbLike; }, 0)
      this.twShare = x.reduce(function (acc, obj) { return acc + obj.twShare; }, 0)
      this.twLike = x.reduce(function (acc, obj) { return acc + obj.twLike; }, 0)
      this.whShare = x.reduce(function (acc, obj) { return acc + obj.whShare; }, 0)
      this.insLove = x.reduce(function (acc, obj) { return acc + obj.insLove; }, 0)
      this.totalComment = x.reduce(function (acc, obj) { return acc + obj.comments; }, 0)
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove   
    })
  }

  getSecondDate(e){
    let secondDate = new Date(e.value).valueOf()
    this.userService.getAllActivity(this.value1, secondDate).subscribe(x=>{
      this.data=x
      this.fbShare = x.reduce(function (acc, obj) { return acc + obj.fbShare; }, 0)
      this.fbLike = x.reduce(function (acc, obj) { return acc + obj.fbLike; }, 0)
      this.twShare = x.reduce(function (acc, obj) { return acc + obj.twShare; }, 0)
      this.twLike = x.reduce(function (acc, obj) { return acc + obj.twLike; }, 0)
      this.whShare = x.reduce(function (acc, obj) { return acc + obj.whShare; }, 0)
      this.insLove = x.reduce(function (acc, obj) { return acc + obj.insLove; }, 0)
      this.totalComment = x.reduce(function (acc, obj) { return acc + obj.comments; }, 0)
      this.totalShare = this.fbShare + this.whShare + this.twShare
      this.totalLike = this.fbLike + this.twLike + this.insLove
    })
  }
 
   customizePoint = (arg: any) => {
    
    if (arg.seriesName == "FB Shares") {
      return { color: "#444e93", hoverStyle: { color: "#ff7c7c" } };
    } else if (arg.seriesName == "FB Likes") {
      return { color: "#909bd1", hoverStyle: { color: "#8c8cff" } };
    } else if (arg.seriesName == "Twitter Shares") {
      return { color: "#0c93ca", hoverStyle: { color: "#8c8cff" } };
    } else if (arg.seriesName == "Twitter Likes") {
      return { color: "#64cdea", hoverStyle: { color: "#8c8cff" } };
    } else if (arg.seriesName == "Insta Loves") {
      return { color: "#e912a0", hoverStyle: { color: "#8c8cff" } };
    } else if (arg.seriesName == "Whatsapp Shares") {
      return { color: "#01b59a", hoverStyle: { color: "#8c8cff" } };
    } else if (arg.seriesName == "Komente") {
      return { color: "#ff7374", hoverStyle: { color: "#8c8cff" } };
    }
}

  
  ngOnInit(): void {
  
  }

}
