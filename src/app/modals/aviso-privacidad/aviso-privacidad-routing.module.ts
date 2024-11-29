import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisoPrivacidadPage } from './aviso-privacidad.page';

const routes: Routes = [
  {
    path: '',
    component: AvisoPrivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisoPrivacidadPageRoutingModule {}
