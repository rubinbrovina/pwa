import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostService } from '../../../services/postService.service';
import { AlertifyService } from '../../../services/Alertify.service';
import { GridOptions } from "ag-grid-community";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manageUsers',
  templateUrl: './manageUsers.component.html',
  styleUrls: ['./manageUsers.component.scss'],
  providers: [PostService, AlertifyService]
})
export class ManageUsersComponent implements OnInit {

  @ViewChild('deleteUser') deleteUser: ModalDirective;
  @ViewChild('editUser') editUser: ModalDirective;

  public gridOptions: GridOptions;
  public getRowNodeId;
  public gridApi;
  public rowNode;
  public dataClicked;
  public specificUser: any={};

  PS1:boolean;
  FRESH1:boolean;
  QEVERI1:boolean;
  userGroup1;

  registerUserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userGroup: new FormControl('ad6764c0-9983-11e8-85a9-0242ac110002', Validators.required),
    PS: new FormControl(false, Validators.pattern('true')),
    FRESH: new FormControl(false, Validators.required),
    QEVERI: new FormControl(false, Validators.required)
  })

  constructor(private _postService: PostService, private alertify: AlertifyService, private spinner: NgxSpinnerService, 
    public router: Router) {
    this.gridOptions = < GridOptions > {};
    this.gridOptions.floatingFilter = true;
    this.gridOptions.rowHeight = 48;
    this.getRowNodeId = function (data) {
      return data.uuid;
    };
  }


  columnDefs = [
    {
      headerName: 'Username',
      field: 'username',
      width: 150
    },
    {
      headerName: 'Emri i përdoruesit',
      field: 'name',
      width: 180
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 150
    },
    {
      headerName: 'Veprime',
      field: 'totActions',
      width: 130
    },
    {headerName: 'Dhoma',
    cellRenderer: function (params) {
      let dhoma;
      if (params.data.rooms[0].name == "PS") {
        dhoma = "PS"
      } else if (params.data.rooms[0].name == "FRESH") {
        dhoma = "FRESH"
      }else if (params.data.rooms[0].name == "QEVERI"){
        dhoma = "MIREQEVERISJA"
      }
      return dhoma;
    }
  },
    {
      headerName: "Veprim",
      suppressMenu: true,
      suppressSorting: true,
      suppressFilter: true,
      width: 240,
      template: `<button  class="btn btn-success" data-action-type="historiku">
              Historiku
              </button>
              <button  class="btn btn-danger" data-action-type="delete">
              Fshij
              </button>
              <button  class="btn btn-warning" data-action-type="edit">
              Edit
              </button>`
    }

  ];

  rowData = [];

  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  rowClicked(e) {
    this.dataClicked = e.data;
    this.rowNode = this.gridApi.getRowNode(this.dataClicked.uuid);
    if (e.event.target !== undefined) {
      let actionType = e.event.target.getAttribute("data-action-type");
      if (actionType == "historiku") {
        this.router.navigate(['/users/manage',this.dataClicked.uuid]);
      }else if(actionType == "delete"){
        this.showDeleteUserModal();
      }else if(actionType == "edit"){
        this.spinner.show();
        this._postService.getSpecificUser(this.dataClicked.uuid).subscribe(
          x=> {
            this.specificUser=x["User"][0]
            this.userGroup1='';
            this.PS1=false;
            this.FRESH1=false;
            this.QEVERI1=false;
            this.specificUser["rooms"].forEach(element => {
              if(element.name=="PS"){
                this.PS1=true;
              }else if(element.name=="FRESH"){
                this.FRESH1=true;
              }else if(element.name=="QEVERI"){
                this.QEVERI1=true;
              }
            });
            if(this.specificUser["groups"][0]["name"]=="Public"){
              this.userGroup1="ad6764c0-9983-11e8-85a9-0242ac110002"
            }else if(this.specificUser["groups"][0]["name"]=="Administrator"){
              this.userGroup1="cbe35d50-c6f6-11e8-85a9-0242ac110002"
            }
          },
          error=> {console.log(error)},
          ()=> {
            this.showEditUserModal();
            this.spinner.hide();
          }
        )       
      }
    }
  }

  getAllUsers(){
    this._postService.getAllUsers().subscribe(x => {
      
      this.rowData=x["User"]
      this.rowData.map(obj=>{
        var tot=0
        // console.log(obj.comments.length)
        tot+=obj.facebookSharebles.length
        tot+=obj.comments.length
        tot+=obj.twitterSharebles.length
        tot+=obj.twitLove.length
        tot+=obj.facebookLike.length
        tot+=obj.whatsappSharebles.length
        tot+=obj.instaLove.length
        obj.totActions= tot
      })
      
    })
  }

  deleteUserSoft(){
    this.spinner.show()
    this._postService.deleteUserSoft(this.dataClicked.uuid).subscribe(
      x=> {
        this.spinner.hide();
        if(x["updateUser"]){
          this.gridApi.updateRowData({ remove: [this.rowNode.data] })
          this.alertify.success("Përdoruesi u fshi me sukses")
        }else{
          this.alertify.error("Veprimi nuk mund të kryhej")
        }
      }
    )
    this.hideDeleteUserModal();
  }

  saveSpecificUser(){
    this.spinner.show();
    this._postService.saveSpecificUser(this.specificUser, this.PS1, this.FRESH1, this.QEVERI1, this.userGroup1).subscribe(
      x=> {
        this.spinner.hide();
        if(x["dd"]){
          var newData = {
            uuid: this.specificUser.uuid,
            name: this.specificUser.name,
            username: this.specificUser.username,
            email: this.specificUser.email
          };
          this.rowNode.setData(newData)
          this.alertify.success("Ndryshimi u krye me sukses")
        }else{
          this.alertify.error("Ndryshimi nuk u krye")
        }
      }
    )
  }

  register(){
    this._postService.registerUser(this.registerUserForm.value)
  }

  showDeleteUserModal(): void {
    this.deleteUser.show();
  }
 
  hideDeleteUserModal(): void {
    this.deleteUser.hide();
  }

  showEditUserModal(): void {
    this.editUser.show();
  }
 
  hideEditUserModal(): void {
    this.editUser.hide();
  }

}
