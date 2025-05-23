import { Routes } from '@angular/router';
import { NotFountPageComponent } from '../views/not-fount-page/not-fount-page.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../views/module-auth/panel-auth.router').then(m => m.USER_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('../views/module-admin/panel-admin.router').then(m => m.USER_ROUTES)
  },
  {
    path: 'user',
    loadChildren: () => import('../views/module-user/panel-user.router').then(m => m.USER_ROUTES)
  },
  {
    path: '404', component: NotFountPageComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];
