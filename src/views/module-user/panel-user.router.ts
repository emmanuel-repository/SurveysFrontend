import { authUserGuard } from '../../core/guards/authUser.guard';
import { Routes } from "@angular/router";
import { MainUserComponent } from "./main-user/main-user.component";
import { AnsweredListComponent } from './answered-list/answered-list.component';
import { AnsweredListResultComponent } from './answered-list-result/answered-list-result.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: MainUserComponent,
    canActivate: [authUserGuard],
    children: [
      { path: 'answered-list', component: AnsweredListComponent },
      { path: 'answered-list-result', component: AnsweredListResultComponent },
      {
        path: 'survey/:id',
        loadComponent: () => import('./answered/answered.component').then(m => m.AnsweredComponent)
      }
    ]
  }
]
