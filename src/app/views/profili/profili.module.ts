import { ProfileRoutingModule } from './profili-routing.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyActivitiesComponent } from './myActivities/myActivities.component';
import { MyProfileComponent } from './myProfile/myProfile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';

// import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';

@NgModule({
    imports: [
      ModalModule,
      NgxSpinnerModule,
      TabsModule.forRoot(),
      TooltipModule.forRoot(),
      ReactiveFormsModule,
      CommonModule,
      CommonModule,
      FormsModule,
      ProfileRoutingModule,
      BsDropdownModule.forRoot(),
      AngularEditorModule
    ],
    declarations: [
     MyActivitiesComponent,
     MyProfileComponent,
     NotificationsComponent
    ]
  })
  export class ProfileModule { }