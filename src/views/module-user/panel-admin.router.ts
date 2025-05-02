import { authUserGuard } from './../../core/guards/authUser.guard';
import { Routes } from "@angular/router";
import { MainUserComponent } from "./main-user/main-user.component";
import { AnsweredComponent } from './answered/answered.component';


export const USER_ROUTES: Routes = [
  {
    path: '',
    component: MainUserComponent,
    canActivate: [authUserGuard],
    children: [
      { path: 'answered', component: AnsweredComponent },
    ]
  }
]
