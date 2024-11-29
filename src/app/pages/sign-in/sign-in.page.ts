import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    private modalCtrl: ModalController,
    public router: Router,
    public toastController: ToastController // Añadir ToastController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}') // Cambiado [0-8] por \d
        ]
      ]
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    if (this.loginForm?.valid) {
      try {
        const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        loading.dismiss();
  
        if (user) {
          console.log('Redirigiendo a la página de Home');
          this.router.navigate(['/home']);
        }
      } catch (error) {
        this.showToast(String(error)); // El error es el mensaje de error amigable del servicio
        loading.dismiss();
      }
    } else {
      this.showToast('Por favor, completa todos los campos correctamente.');
      loading.dismiss();
    }
  }
  
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
