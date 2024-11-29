import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-aviso-privacidad',
  templateUrl: './aviso-privacidad.page.html',
  styleUrls: ['./aviso-privacidad.page.scss'],
})
export class AvisoPrivacidadPage {

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
