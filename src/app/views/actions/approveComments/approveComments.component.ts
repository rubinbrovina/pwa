import {
  Component,
  OnInit
} from '@angular/core';
import {
  GridOptions
} from "ag-grid-community";
import {
  PostService
} from '../../../services/postService.service';
import { AlertifyService } from '../../../services/Alertify.service';

@Component({
  selector: 'app-approveComments',
  templateUrl: './approveComments.component.html',
  styleUrls: ['./approveComments.component.scss'],
  providers: [PostService, AlertifyService]
})
export class ApproveCommentsComponent implements OnInit {

  public gridOptions: GridOptions;
  public getRowNodeId;
  public gridApi;

  constructor(private _postService: PostService, private alertify:AlertifyService) {
    this.gridOptions = < GridOptions > {};
    this.gridOptions.floatingFilter = true;
    this.gridOptions.rowHeight = 48;
    this.getRowNodeId = function(data) {
      return data.id;
    };
  }


  columnDefs = [{
      headerName: 'User',
      field: 'user.0.username',
      width: 200
    },
    {
      headerName: 'Nickname',
      field: 'nickname',
      width: 200
    },
    {
      headerName: 'Komenti',
      field: 'comment',
      width: 200
    },
    {
      headerName: 'Status',
      cellRenderer: function (params){
        let statusi;
        if(params.data.status==true){
          statusi="I aprovuar"
        }else if(params.data.status==false){
          statusi="Jo i aprovuar"
        }
        return statusi;
      },
      width: 150
    },
    {
      headerName: 'Url',
      field: 'blogUrl',
      width: 200
    },
    {
      headerName: "Veprim",
      suppressMenu: true,
      suppressSorting: true,
      suppressFilter: true,
      width: 250,
      template: `<button  class="btn btn-success" data-action-type="aprovo">
              Aprovo
              </button>
              <button  class="btn btn-danger" data-action-type="mosAprovo">
              Mos e aprovo
              </button>`
    }
    
  ];

  rowData = [];

  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit() {
   this.getAllComments();
  }

  getAllComments(){
    this._postService.getAllCommentsToApprove().subscribe(x => {
      this.rowData = x["Comment"]
    });
  }

  rowClicked(e) {
    let data = e.data;
    var rowNode = this.gridApi.getRowNode(data.id);
    if (e.event.target !== undefined) {
      let actionType = e.event.target.getAttribute("data-action-type");
      if (actionType == "aprovo") {
        this._postService.approveComment(data.uuid, data.nickname, data.comment).subscribe(
          x=> {
            if(x["updateComment"]){
              this.getAllComments()
              this.alertify.success("Komenti u aprova")
            }
          }
        );
      } else if (actionType == "mosAprovo") {
        this._postService.dontApproveComment(data.uuid, data.nickname, data.comment).subscribe(
          x=> {
            if(x["updateComment"]){
              this.getAllComments()
              this.alertify.success("Komenti nuk u aprova")
            }
          }
        );
      }
    }
  }
}
