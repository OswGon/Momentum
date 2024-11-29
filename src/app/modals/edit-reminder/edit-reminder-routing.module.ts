import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditReminderPage } from './edit-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: EditReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditReminderPageRoutingModule {}
