import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AvisoPrivacidadPage } from 'src/app/modals/aviso-privacidad/aviso-privacidad.page';
import { PoliticaPrivacidadPage } from 'src/app/modals/politica-privacidad/politica-privacidad.page';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  regForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}') // Corrección en la expresión regular
        ]
      ],
      politicaPrivacidad: [false, Validators.requiredTrue],
      avisoPrivacidad: [false, Validators.requiredTrue]
    });
  }

  // Método para abrir el modal de Política de Privacidad
  async openPoliticaPrivacidad() {
    const modal = await this.modalCtrl.create({
      component: PoliticaPrivacidadPage
    });
    return await modal.present();
  }

  // Método para abrir el modal de Aviso de Privacidad
  async openAvisoPrivacidad() {
    const modal = await this.modalCtrl.create({
      component: AvisoPrivacidadPage
    });
    return await modal.present();
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    if (this.regForm?.valid) {
      try {
        const user = await this.authService.registerUser(
          this.regForm.value.email,
          this.regForm.value.password
        );
        loading.dismiss();
  
        if (user) {
          await this.presentVerificationAlert();
        }
      } catch (error) {
        console.log('Error de registro:', error);
        loading.dismiss();
      }
    } else {
      console.log('Formulario no válido');
      loading.dismiss();
    }
  }
  
  
  async presentVerificationAlert() {
    const alert = await this.alertController.create({
      header: 'Verificación de correo electronico',
      message: 'Registro exitoso. Por favor, verifica tu bandeja de correo electrónico para activar tu cuenta antes de iniciar sesión.',
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.href = '/sign-in';
        }
      }]
    });

    await alert.present();
}

  
}
