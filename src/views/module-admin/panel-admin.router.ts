import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { authAdminGuard } from "core/guards/authAdmin.guard";
import { MainAdminComponent } from "./main-admin/main-admin.component";
import { SurveysComponent } from "./surveys/surveys.component";
import { QuestionComponent } from "./question/question.component";


export const USER_ROUTES: Routes = [
  {
    path: '',
    component: MainAdminComponent,
    canActivate: [authAdminGuard],
    children: [
      { path: 'config-admins', component: AdminComponent },
      { path: 'config-surveys', component: SurveysComponent },
      { path: 'config-question/:id', component: QuestionComponent },
    ]
  }
]
