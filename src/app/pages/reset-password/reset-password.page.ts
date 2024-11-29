import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: any;

  constructor(
    public router: Router,
    public authService: AuthenticationService,
    public alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit() {}

  async resetPassword() {
    this.authService
      .resetPassword(this.email)
      .then(async () => {
        console.log('reset link sent');
        await this.presentAlert(); // Mostrar el alert
        this.router.navigate(['/sign-in']); // Navegar a la página de inicio de sesión después
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Método para mostrar el alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Restablecer contraseña',
      message: 'Se ha enviado un enlace de restablecimiento. Revisa tu bandeja de entrada.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
