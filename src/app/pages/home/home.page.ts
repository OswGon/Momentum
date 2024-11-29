import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ReminderService } from '../../services/reminder.service';
import { AddReminderPage } from '../../modals/add-reminder/add-reminder.page';
import { EditReminderPage } from 'src/app/modals/edit-reminder/edit-reminder.page';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  reminders: any[] = [];
  progress = 0;
  healthRecommendations = '';
  showBreadcrumb: string | null = null;
  weatherData: any;
  completedReminders: Set<string> = new Set();

  constructor(
    private reminderService: ReminderService,
    private authenticationService: AuthenticationService,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadReminders();
    this.getWeatherData();
    this.requestNotificationPermission();
    this.startReminderCheck(); // Iniciar el proceso de verificación de recordatorios
  }

  async openAddReminderModal() {
    const modal = await this.modalCtrl.create({
      component: AddReminderPage,
    });

    await modal.present();
    await modal.onDidDismiss();
    this.loadReminders();
  }

  loadReminders() {
    this.reminderService
      .getReminders()
      .then((reminders) => {
        console.log('Recordatorios cargados:', reminders);
        this.reminders = reminders;
        this.updateProgress();
      })
      .catch((error) => {
        console.error('Error al cargar recordatorios:', error);
        this.showErrorAlert(error);
      });
  }

  async markAsCompleted(id: string) {
    try {
      await this.reminderService.markAsCompleted(id);
      this.loadReminders();
      this.completedReminders.add(id);
      await this.showToast('Recordatorio marcado como completado.', 'success');
    } catch (error) {
      await this.showErrorAlert('Este ya ha sido marcado como completado');
    }
  }

  isCompleted(reminderId: string): boolean {
    return this.completedReminders.has(reminderId);
  }

  async editReminder(id: string) {
    const modal = await this.modalCtrl.create({
      component: EditReminderPage,
      componentProps: { reminderId: id },
    });

    await modal.present();
    await modal.onDidDismiss();
    this.loadReminders();
  }

  async deleteReminder(id: string) {
    try {
      await this.reminderService.deleteReminder(id);
      this.loadReminders();
      await this.showToast('Recordatorio eliminado.', 'danger');
    } catch (error) {
      await this.showErrorAlert(error);
    }
  }

  async updateProgress() {
    try {
      this.progress = await this.reminderService.getProgress();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al actualizar el progreso:', error);
    }
  }

  getWeatherData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiKey = 'b8d619ab3234667b78f79eea8cbf59a8';
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          this.http.get(url).subscribe(
            (response: any) => {
              this.weatherData = response;
              console.log('Clima actual:', this.weatherData);
            },
            (error) => {
              console.error('Error obteniendo clima:', error);
              this.showErrorAlert(error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          this.showErrorAlert(error);
        }
      );
    } else {
      console.error('Geolocalización no disponible');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  private async showErrorAlert(error: any) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

  toggleBreadcrumb(reminderId: string) {
    this.showBreadcrumb = this.showBreadcrumb === reminderId ? null : reminderId;
  }

  // Solicitar permiso para notificaciones
  private async requestNotificationPermission() {
    await this.reminderService.requestNotificationPermission();
  }

  // Iniciar el proceso de verificación periódica de recordatorios
  private startReminderCheck() {
    setInterval(() => {
      this.reminderService.checkAndNotifyReminders();
    }, 60000); // Revisión cada minuto
  }
  async logout() {
    try {
      await this.authenticationService.signOut();  // Llama al método signOut del servicio de autenticación
      console.log('Sesión cerrada');
      // Redirigir al usuario a la página de login
      window.location.href = '/sign-in'; // O usa el router para navegar
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  }
}
