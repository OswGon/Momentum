import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisoPrivacidadPageRoutingModule } from './aviso-privacidad-routing.module';

import { AvisoPrivacidadPage } from './aviso-privacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisoPrivacidadPageRoutingModule
  ],
  declarations: [AvisoPrivacidadPage]
})
export class AvisoPrivacidadPageModule {}
