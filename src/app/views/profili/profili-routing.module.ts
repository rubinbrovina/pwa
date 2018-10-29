import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyActivitiesComponent } from './myActivities/myActivities.component';
import { MyProfileComponent } from './myProfile/myProfile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuard } from '../../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Profili'
    },
    children: [
      {
        path: 'myProfile',
        component: MyProfileComponent,
        data: {
          title: 'Profili im'
        }
      },
      {
          path: 'myActivities',
          component: MyActivitiesComponent,
          data: {
              title: 'Aktivitetet e mia'         
          }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: {
            title: 'Njoftime'         
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
