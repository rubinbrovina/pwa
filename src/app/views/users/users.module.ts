import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersRoutingModule } from "./users-routing.module";
import { UserInsightsComponent } from "./userInsights/userInsights.component";
import { ManageUsersComponent } from "./manageUsers/manageUsers.component";
import { UserActivityComponent } from "./userActivity/userActivity.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule, ButtonsModule } from "ngx-bootstrap";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChartsModule } from "ng2-charts";
import { DxChartModule, DxDateBoxModule } from 'devextreme-angular';
import { MireQeverisjaComponent } from "./mireQeverisja/mireQeverisja.component";
import { PsComponent } from "./ps/ps.component";
import { FresshComponent } from "./fressh/fressh.component";


@NgModule({
  imports: [
    NgxSpinnerModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    UsersRoutingModule,
    BsDropdownModule.forRoot(),
    AngularEditorModule,
    AgGridModule.withComponents([]),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    DxChartModule,
    DxDateBoxModule,
   
  ],
  declarations: [
    PsComponent,
    FresshComponent,
    UserActivityComponent,
    UserInsightsComponent,
    ManageUsersComponent,
    DashboardComponent,
    MireQeverisjaComponent
  ]

})
export class UsersModule {}