import { ActionsRoutingModule } from "./actions-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShareableComponent } from "./shareable/shareable.component";
import { ReadAndCommentComponent } from "./readAndComment/readAndComment.component";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ApproveCommentsComponent } from "./approveComments/approveComments.component";
// import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { AgGridModule } from 'ag-grid-angular';
import { menaxhimiIPostimeve } from "./menaxhimiIPostimeve/menaxhimiIPostimeve.component";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipeModule } from "../../_pipes/pipes.module";

@NgModule({
    imports: [
      PipeModule,
      NgxSpinnerModule,
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
      ReactiveFormsModule,
      CommonModule,
      CommonModule,
      FormsModule,
      ActionsRoutingModule,
      BsDropdownModule.forRoot(),
      AngularEditorModule,
      AgGridModule.withComponents([])
      
    ],
    declarations: [
    menaxhimiIPostimeve,
    ApproveCommentsComponent,
    ReadAndCommentComponent,
    ShareableComponent
    ]
  })
  export class ActionsModule { }