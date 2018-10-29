import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUsersComponent } from './manageUsers/manageUsers.component';
import { UserActivityComponent } from "./userActivity/userActivity.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MireQeverisjaComponent } from './mireQeverisja/mireQeverisja.component';
import { FresshComponent } from './fressh/fressh.component';
import { PsComponent } from './ps/ps.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: '',
        component: ManageUsersComponent,
        data: {
          title: 'Menaxho përdoruesit'
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Aktivitetet e mia'
        }
      },
      {
        path: 'mireqeverisja',
        component: MireQeverisjaComponent,
        data: {
          title: 'Mirëqeverisja'
        }
      },
      {
        path: 'ps',
        component: PsComponent,
        data: {
          title: 'PS'
        }
      },
      {
        path: 'fressh',
        component: FresshComponent,
        data: {
          title: 'FRESSH'
        }
      },
      {
        path: 'manage/:uuid',
        component: UserActivityComponent,
        data: {
          title: 'Aktiviteti i përdoruesit'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
