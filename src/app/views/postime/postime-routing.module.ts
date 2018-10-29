import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_guards/auth.guard';
import { ShareComponent } from './share/share.component';
import { CommentComponent } from './comment/comment.component';
import { FullViewOfShareComponent } from "./fullViewOfShare/fullViewOfShare.component";
import { FullViewOfCommentComponent } from "./fullViewOfComment/fullViewOfComment.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Postime'
    },
    children: [    
      {
          path: '',
          component: ShareComponent,
          data: {
              title: 'Shpërndaj'         
          }
      },
      {
        path: 'shperndaj/:uuid',
        component: FullViewOfShareComponent,
        data: {
            title: 'Post i detajuar'         
        }
      },  
      {
        path: 'lexo&komento',
        component: CommentComponent,
        data: {
            title: 'Lexo & Komento'     
        }
      },
      {
        path: 'lexo&komento/:uuid',
        component: FullViewOfCommentComponent,
        data: {
            title: 'Post i detajuar'         
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostimeRoutingModule {}
