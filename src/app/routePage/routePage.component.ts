import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-routePage',
  templateUrl: './routePage.component.html',
  styleUrls: ['./routePage.component.scss']
})
export class RoutePageComponent implements OnInit {
  private spinner: NgxSpinnerService
  currentUser = new Array;
  constructor(private router: Router) {}
  showRoomPS : boolean = false;
  showRoomFRESH : boolean = false;
  showRoomGOV : boolean = false;
  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem('room'));
    
    if(this.currentUser.indexOf('b1705af0-c7c7-11e8-85a9-0242ac110002')>-1){

      this.showRoomGOV = true;
    }
    if(this.currentUser.indexOf('ad702f70-c7c7-11e8-85a9-0242ac110002')>-1){

      this.showRoomFRESH = true;
    } 
    if(this.currentUser.indexOf('f23af4e0-c719-11e8-85a9-0242ac110002')>-1){

      this.showRoomPS = true;
    } 
    
  }
  
goToRoomPartia(){
  localStorage.setItem("currentUser", "f23af4e0-c719-11e8-85a9-0242ac110002")
  this.router.navigate(["/postime"])
}

goToRoomQeveria(){
  localStorage.setItem("currentUser", "b1705af0-c7c7-11e8-85a9-0242ac110002")
  this.router.navigate(["/postime"])
}
goToRoomFresh(){
  localStorage.setItem("currentUser", "ad702f70-c7c7-11e8-85a9-0242ac110002")
  this.router.navigate(["/postime"])
}
}
