import { Component, Input, OnInit } from '@angular/core';
import { navItems, AdminNavItems, SuperAdminNavItems } from './../../_nav';

import { Router } from '@angular/router';
import { LoginService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public superAdminNavItems = SuperAdminNavItems;
  public adminNavItems = AdminNavItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  showNavSuperAdmin: boolean = false;
  showNavAdmin : boolean = false;
  showNavPublic : boolean = false;
  currentUser = new Array;
  constructor(private router: Router, private authService: LoginService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

ngOnInit(){

  this.currentUser = JSON.parse(localStorage.getItem('group'));
    
  if(this.currentUser.indexOf('cbe35d50-c6f6-11e8-85a9-0242ac110002')>-1){

    this.showNavAdmin = true;
  }
  if(this.currentUser.indexOf('ad6764c0-9983-11e8-85a9-0242ac110002')>-1){

    this.showNavPublic = true;
  } 
  if(this.currentUser.indexOf('71b25880-cbb6-11e8-b9ab-0242ac110002')>-1){

    this.showNavSuperAdmin = true;
  } 

}
  logout(){
    
    this.currentUser = undefined;
    this.authService.decodedToken = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  
  }
}
