import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.page.html',
  styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage {
  reminder = { title: '', text: '', time: '', repeat: '' };

  @Output() reminderAdded = new EventEmitter<void>();

  constructor(
    private reminderService: ReminderService, 
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  async addReminder(event: Event) {
    event.preventDefault();

    if (!this.reminder.title.trim()) {
      this.showAlert('Error', 'El nombre del hábito no puede estar vacío.');
      return;
    }

    const message = `${this.reminder.title}: ${this.reminder.text}`;
    try {
      await this.reminderService.addReminder(message, this.reminder.time, this.reminder.repeat);
      this.reminderAdded.emit();
      this.reminder = { title: '', text: '', time: '', repeat: '' };
      this.closeModal();
    } catch (error) {
      console.error("Error al agregar recordatorio:", error);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
