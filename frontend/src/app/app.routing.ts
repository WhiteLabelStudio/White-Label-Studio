import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ErrorComponent } from './pages/error/error.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', component: ErrorComponent }
];


var item = JSON.parse(localStorage.getItem('UserDt'));

if(item && item.user_email){
  routes[0].redirectTo = 'pages';
}else{
  routes[0].redirectTo = 'login';
}

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   // preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
   // useHash: true
});