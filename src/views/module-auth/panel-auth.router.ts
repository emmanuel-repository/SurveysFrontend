import { Route, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";


export const USER_ROUTES: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent }
]
