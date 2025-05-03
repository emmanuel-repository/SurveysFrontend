import { authUserGuard } from '../../core/guards/authUser.guard';
import { Routes } from "@angular/router";
import { MainUserComponent } from "./main-user/main-user.component";
import { AnsweredListComponent } from './answered-list/answered-list.component';


export const USER_ROUTES: Routes = [
  {
    path: '',
    component: MainUserComponent,
    canActivate: [authUserGuard],
    children: [
      { path: 'answered-list', component: AnsweredListComponent },

      {
        path: 'survey/:id',
        loadComponent: () => import('./answered/answered.component').then(m => m.AnsweredComponent)
      }
    ]
  }
]
