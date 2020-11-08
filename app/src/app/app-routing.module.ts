import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentsShellComponent } from './components/appointments-shell/appointments-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsShellComponent },
  { path: 'appointments/add', component: AppointmentComponent },
  { path: 'appointments/edit/:id', component: AppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
