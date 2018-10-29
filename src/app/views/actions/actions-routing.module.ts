import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareableComponent } from './shareable/shareable.component';
import { ReadAndCommentComponent } from './readAndComment/readAndComment.component';
import { AuthGuard } from '../../_guards/auth.guard';
import { ApproveCommentsComponent } from "./approveComments/approveComments.component";
import { menaxhimiIPostimeve } from "./menaxhimiIPostimeve/menaxhimiIPostimeve.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Actions',
      expectedRole: 'cbe35d50-c6f6-11e8-85a9-0242ac110002'
    },
    children: [
      {
          path: '',
          component: ShareableComponent,
          data: {
              title: 'Shareable Post',
              expectedRole: 'cbe35d50-c6f6-11e8-85a9-0242ac110002'       
          }
      },
      {
        path: 'readAndComment',
        component: ReadAndCommentComponent,
        data: {
            title: 'Read and comment',
            expectedRole: 'cbe35d50-c6f6-11e8-85a9-0242ac110002'
        }
      },
      {
        path: 'approveComments',
        component: ApproveCommentsComponent,
        data: {
            title: 'Aprovo Komente',
            expectedRole: 'cbe35d50-c6f6-11e8-85a9-0242ac110002'
        }
      },
      {
        path: 'managePosts',
        component: menaxhimiIPostimeve,
        data: {
            title: 'Menaxho Postime',
            expectedRole: 'cbe35d50-c6f6-11e8-85a9-0242ac110002'
        }
      }
    ]
  }
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [
      
   ]
})
export class ActionsRoutingModule {}
