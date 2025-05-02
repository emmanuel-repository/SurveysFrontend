import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { authGuard } from "core/guards/auth.guard";
import { MainAdminComponent } from "./main-admin/main-admin.component";


export const USER_ROUTES: Routes = [
  {
    path: '',
    component: MainAdminComponent,
    canActivate: [authGuard],
    children: [
      { path: 'config-admin', component: AdminComponent },
    ]
  }
]
