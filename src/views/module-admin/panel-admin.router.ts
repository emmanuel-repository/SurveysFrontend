import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { authGuard } from "core/guards/auth.guard";


export const USER_ROUTES: Routes = [
  { path: '', component: AdminComponent, canActivate: [authGuard] }
]
