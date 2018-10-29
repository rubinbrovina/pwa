import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoutePageComponent } from './routePage/routePage.component';
import { RoleGuard } from './_guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  
  {
    path: '',
    canActivate: [AuthGuard],
    component: RoutePageComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'actions',
        loadChildren: './views/actions/actions.module#ActionsModule',
        canActivate: [RoleGuard],
        data: {
          expectedRole: ["71b25880-cbb6-11e8-b9ab-0242ac110002","cbe35d50-c6f6-11e8-85a9-0242ac110002"]
        }
      },   
      {
        path: 'profili',
        loadChildren: './views/profili/profili.module#ProfileModule'
      },
      {
        path: 'postime',
        loadChildren: './views/postime/postime.module#PostimeModule'
      },
      {
        path:'users',
        loadChildren:'./views/users/users.module#UsersModule',
        canActivate: [RoleGuard],
        data: {
          expectedRole: ["71b25880-cbb6-11e8-b9ab-0242ac110002"]
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
