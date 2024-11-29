import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'aviso-privacidad',
    loadChildren: () => import('./modals/aviso-privacidad/aviso-privacidad.module').then( m => m.AvisoPrivacidadPageModule)
  },
  {
    path: 'politica-privacidad',
    loadChildren: () => import('./modals/politica-privacidad/politica-privacidad.module').then( m => m.PoliticaPrivacidadPageModule)
  },
  {
    path: 'add-reminder',
    loadChildren: () => import('./modals/add-reminder/add-reminder.module').then( m => m.AddReminderPageModule)
  },
  {
    path: 'edit-reminder',
    loadChildren: () => import('./modals/edit-reminder/edit-reminder.module').then( m => m.EditReminderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
