import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard }from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';
const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login', canActivate: [NologinGuard],
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./componentes/citas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: 'registro', canActivate: [NologinGuard],
    loadChildren: () => import('./componentes/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./componentes/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
