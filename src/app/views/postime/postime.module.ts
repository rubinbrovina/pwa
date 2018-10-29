
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ShareComponent } from "./share/share.component";
import { CommentComponent } from "./comment/comment.component";
import { PostimeRoutingModule } from "./postime-routing.module";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FullViewOfShareComponent } from "./fullViewOfShare/fullViewOfShare.component";
import { FullViewOfCommentComponent } from "./fullViewOfComment/fullViewOfComment.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthServiceConfig, FacebookLoginProvider, AuthService } from "angular-6-social-login";
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from "../../services/Alertify.service";
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipeModule } from "../../_pipes/pipes.module";
import { AuthInterceptor } from "../../services/auth.interceptor";
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("204299226936919")
        }
      ]
  );
  return config;
}

@NgModule({
    imports: [
      NgxSpinnerModule,
      PaginationModule.forRoot(),
      TooltipModule.forRoot(),
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      PostimeRoutingModule,
      BsDropdownModule.forRoot(),
      AngularEditorModule,
      MatFormFieldModule,
      MatIconModule,
      ModalModule.forRoot(),
      PipeModule
    ],
    declarations: [
    FullViewOfCommentComponent,
    FullViewOfShareComponent,
    ShareComponent,
    CommentComponent
    ],
providers: [
  AuthInterceptor,
  BsModalRef,
  AuthService,
  AlertifyService,
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
]
  })
  export class PostimeModule { }