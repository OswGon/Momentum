import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private dbInstance: Storage | null = null;
  private readonly db_table: string = 'reminderTable';

  constructor(private storage: Storage) {
    this.initDB();
  }

  // Inicializa la base de datos
  async initDB() {
    try {
      this.dbInstance = await this.storage.create();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  // Asegura que la base de datos esté lista antes de usarla
  private async ensureDbReady() {
    if (!this.dbInstance) {
      console.error('Database not initialized. Call initDB() first.');
      await this.initDB();
    }
  }

  // Método para agregar un recordatorio
  async addReminder(message: string, dateTime: string, repeatPeriod: string) {
    try {
      await this.ensureDbReady();
      const id = new Date().getTime().toString();
      const reminder = {
        id,
        message,
        dateTime,
        repeatPeriod,
        completed: false,
        lastCompleted: null,
        lastNotified: null, // Para evitar enviar notificaciones duplicadas
      };
      await this.dbInstance?.set(id, reminder);
      console.log('Reminder added successfully:', reminder);
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  }

  // Método para obtener todos los recordatorios
  async getReminders(): Promise<any[]> {
    try {
      await this.ensureDbReady();
      const reminders: any[] = [];
      await this.dbInstance?.forEach((value, key) => {
        reminders.push(value);
      });
      console.log('Reminders fetched successfully:', reminders);
      return reminders;
    } catch (error) {
      console.error('Error fetching reminders:', error);
      throw error;
    }
  }

  // Método para obtener un recordatorio por ID
  async getReminderById(id: string): Promise<any> {
    try {
      await this.ensureDbReady();
      const reminder = await this.dbInstance?.get(id);
      if (!reminder) {
        throw new Error(`No reminder found with id: ${id}`);
      }
      return reminder;
    } catch (error) {
      console.error('Error fetching reminder by ID:', error);
      throw error;
    }
  }

  // Método para marcar un recordatorio como completado
  async markAsCompleted(id: string) {
    try {
      await this.ensureDbReady();
      const reminder = await this.dbInstance?.get(id);
      if (!reminder) {
        throw new Error(`No reminder found with id: ${id}`);
      }

      const today = new Date().toISOString().split('T')[0];
      if (reminder.lastCompleted !== today) {
        reminder.completed = true;
        reminder.lastCompleted = today;
        await this.dbInstance?.set(id, reminder);
        console.log('Reminder marked as completed:', reminder);
      } else {
        throw new Error('This reminder has already been marked as completed today.');
      }
    } catch (error) {
      console.error('Error marking reminder as completed:', error);
      throw error;
    }
  }

  // Método para actualizar un recordatorio existente
  async updateReminder(id: string, updatedReminder: any) {
    try {
      await this.ensureDbReady();
      const reminder = await this.dbInstance?.get(id);
      if (!reminder) {
        throw new Error(`No reminder found with id: ${id}`);
      }

      const mergedReminder = { ...reminder, ...updatedReminder };
      await this.dbInstance?.set(id, mergedReminder);
      console.log('Reminder updated successfully:', mergedReminder);
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  }

  // Método para eliminar un recordatorio
  async deleteReminder(id: string) {
    try {
      await this.ensureDbReady();
      const reminder = await this.dbInstance?.get(id);
      if (!reminder) {
        throw new Error(`No reminder found with id: ${id}`);
      }

      await this.dbInstance?.remove(id);
      console.log('Reminder deleted successfully');
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  }

  // Método para calcular el progreso de recordatorios completados
  async getProgress(): Promise<number> {
    try {
      const reminders = await this.getReminders();
      if (reminders.length === 0) {
        console.log('No reminders to calculate progress.');
        return 0; // Evita división por cero
      }

      const completedReminders = reminders.filter((r) => r.completed);
      const progress = completedReminders.length / reminders.length;
      console.log('Progress calculated:', progress);
      return progress;
    } catch (error) {
      console.error('Error calculating progress:', error);
      throw error;
    }
  }

  // Método para verificar recordatorios y enviar notificaciones
  async checkAndNotifyReminders() {
    try {
      await this.ensureDbReady();
      const reminders = await this.getReminders();
      const now = new Date();

      reminders.forEach((reminder) => {
        const reminderDate = new Date(reminder.dateTime);

        // Verificar si la fecha y hora coinciden
        if (
          reminderDate <= now &&
          (!reminder.lastNotified || new Date(reminder.lastNotified) < reminderDate)
        ) {
          this.sendNotification(reminder.message); // Enviar la notificación
          reminder.lastNotified = now.toISOString(); // Actualizar la última notificación
          this.updateReminder(reminder.id, reminder); // Guardar el cambio
        }
      });
    } catch (error) {
      console.error('Error checking and notifying reminders:', error);
      throw error;
    }
  }

  // Método para enviar una notificación local
  private sendNotification(message: string) {
    if (Notification.permission === 'granted') {
      new Notification('MOMENTUM', {
        body:"Momentum te recuerda tu habito " + message,
        icon: 'assets/icon/favicon.png', // Cambia por tu ícono personalizado
      });
    } else {
      console.warn('Notification permission not granted');
    }
  }

  // Solicitar permiso para notificaciones
  async requestNotificationPermission() {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }
}
