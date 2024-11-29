import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-edit-reminder',
  templateUrl: './edit-reminder.page.html',
  styleUrls: ['./edit-reminder.page.scss'],
})
export class EditReminderPage {
  @Input() reminderId: string = ''; // ID del recordatorio a editar
  reminder = { title: '', text: '', time: '', repeat: '', message: '' };

  @Output() reminderUpdated = new EventEmitter<void>();

  constructor(
    private reminderService: ReminderService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadReminder();
  }

  // Cargar los datos del recordatorio para editarlo
  async loadReminder() {
    if (this.reminderId) {
      try {
        const reminderData = await this.reminderService.getReminderById(this.reminderId);
        this.reminder = { ...reminderData }; // Rellenar el formulario con los datos existentes
      } catch (error) {
        console.error('Error al cargar el recordatorio:', error);
        this.showAlert('Error', 'No se pudo cargar el recordatorio.');
      }
    }
  }

  // Actualizar el recordatorio
  async updateReminder(event: Event) {
    event.preventDefault();

    if (!this.reminder.title.trim()) {
      this.showAlert('Error', 'El nombre del hábito no puede estar vacío.');
      return;
    }

    // Crear el mensaje actualizado (puede ser generado dinámicamente)
    const updatedMessage = `${this.reminder.title}: ${this.reminder.text}`;

    const updatedReminder = {
      title: this.reminder.title,
      text: this.reminder.text,
      time: this.reminder.time,
      repeat: this.reminder.repeat,
      message: updatedMessage, // Incluimos el mensaje actualizado
    };

    try {
      await this.reminderService.updateReminder(this.reminderId, updatedReminder);
      this.reminderUpdated.emit(); // Emitir evento para notificar que se actualizó el recordatorio
      this.closeModal();
    } catch (error) {
      console.error('Error al actualizar recordatorio:', error);
      this.showAlert('Error', 'No se pudo actualizar el recordatorio.');
    }
  }

  // Cerrar el modal
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Mostrar alertas de error
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
