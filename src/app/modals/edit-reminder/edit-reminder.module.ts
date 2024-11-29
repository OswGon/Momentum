import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReminderPageRoutingModule } from './edit-reminder-routing.module';

import { EditReminderPage } from './edit-reminder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditReminderPageRoutingModule
  ],
  declarations: [EditReminderPage]
})
export class EditReminderPageModule {}
