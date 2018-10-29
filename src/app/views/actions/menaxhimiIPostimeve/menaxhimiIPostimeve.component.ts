import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { PostService } from '../../../services/postService.service';
import { AlertifyService } from '../../../services/Alertify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menaxhimiIPostimeve',
  templateUrl: './menaxhimiIPostimeve.component.html',
  styleUrls: ['./menaxhimiIPostimeve.component.scss'],
  providers: [PostService, AlertifyService]
})
export class menaxhimiIPostimeve implements OnInit {

  @ViewChild('editPost') editPost: ModalDirective;
  @ViewChild('deletePost') deletePost: ModalDirective;
  posts;
  specificPost:any={};
  sortedPosts = new Array().fill('')
  public gridOptions: GridOptions;
  public getRowNodeId;
  public gridApi;
  public rowNode;
  public dataClicked;

  constructor(private _postService: PostService, private alertify: AlertifyService, private spinner: NgxSpinnerService) {
    this.gridOptions = < GridOptions > {};
    this.gridOptions.floatingFilter = true;
    this.gridOptions.rowHeight = 48;
    this.getRowNodeId = function (data) {
      return data.uuid;
    };
  }


  columnDefs = [{
      headerName: 'Tipi i postimit',
      cellRenderer: function (params) {
        let tipi;
        if (params.data.postType.type == "Comment") {
          tipi = "Lexo dhe komento"
        } else if (params.data.postType.type == "Shareble") {
          tipi = "Shpërndaj"
        }
        return tipi;
      },
      width: 180
    },
    {
      headerName: 'Titulli',
      field: 'title',
      width: 250
    },
    {
      headerName: 'Kontenti',
      field: 'body',
      width: 350
    },
    {
      headerName: 'Url',
      field: 'shareableUrl',
      width: 300
    },
    {
      headerName: "Veprim",
      suppressMenu: true,
      suppressSorting: true,
      suppressFilter: true,
      width: 180,
      template: `<button  class="btn btn-success" data-action-type="edit">
              Edit
              </button>
              <button  class="btn btn-danger" data-action-type="delete">
              Fshij
              </button>`
    }

  ];

  rowData = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Teksti i postimit',
    translate: 'no'
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit() {
    
    this.getAllPosts();
    // console.log(this.gridOptions.api)
  }

  getAllPosts() {
    this.spinner.show()
    this._postService.getAllPosts().subscribe(x => {
      this.spinner.hide();
      this.sortedPosts = x["Post"]
      this.rowData = this.sortedPosts.sort(function(a,b){
        a = a.datetime
        b = b.datetime
        if(a>b){
          return -1;
        }
        if(a<b){
          return 1;
        }
        return 0
      })
      
    });
  }

  ruajNdryshiminSpecificPost(){
    this.spinner.show()
    this._postService.saveSpecificPost(this.specificPost).subscribe(
      x=> {
        this.spinner.hide()
        if(x["updatePost"]){
          var newData = {
            uuid: this.specificPost.uuid,
            title: this.specificPost.title,
            body: this.specificPost.body,
            shareableUrl: this.specificPost.shareableUrl
          };
          this.rowNode.setData(newData)
          this.alertify.success("Ndryshimi u krye me sukses")
        }else{
          this.alertify.error("Ndryshimi nuk u krye")
        }
      }
    )
  }

  deletePostim(){
    this.spinner.show();
        this._postService.deleteSpecificPost(this.dataClicked.uuid).subscribe(
          x=> {
            this.spinner.hide();
            if(x["deletePost"]){
              this.gridApi.updateRowData({ remove: [this.rowNode.data]})   
              this.alertify.success("Postimi u fshi me sukses")
            }else{
              this.alertify.error("Veprimi nuk mund të kryhej")
            }
          }
        )
    this.hideDeletePostModal();
  }

  rowClicked(e) {
    this.dataClicked = e.data;
    this.rowNode = this.gridApi.getRowNode(this.dataClicked.uuid);
    // this.rowNode.setDataValue('body', 'asdas')
    if (e.event.target !== undefined) {
      let actionType = e.event.target.getAttribute("data-action-type");
      if (actionType == "edit") {
        this.spinner.show();
        this._postService.getSpecificPost(this.dataClicked.uuid).subscribe(
          x=> {this.specificPost=x["Post"][0]},
          error=> console.log(error),
          ()=> {
            this.showEditPostModal(),
            this.spinner.hide()
          }
        );
      }else if(actionType == "delete"){
        this.showDeletePostModal();
      }
    }
  }

  showEditPostModal(): void {
    this.editPost.show();
  }
 
  hideEditPostModal(): void {
    this.editPost.hide();
  }

  showDeletePostModal(): void {
    this.deletePost.show();
  }
 
  hideDeletePostModal(): void {
    this.deletePost.hide();
  }

}
