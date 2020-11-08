import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

import { AppointmentsService }  from '../../appointments.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointments-shell',
  templateUrl: './appointments-shell.component.html',
  styleUrls: ['./appointments-shell.component.scss']
})
export class AppointmentsShellComponent implements OnInit {
  appointments: Appointment[];
  error: string;
  loading = true;
  successMsg: string;

  constructor(
    private appointmentsService: AppointmentsService,
  ) { }

  ngOnInit(): void {
    this.loadAppointments()
  }

  loadAppointments() {
    this.appointmentsService.getAppointments().subscribe(
      res => {
        this.appointments = res;
        this.loading = false;
        console.log(this.appointments)
      },
      err => {
        this.error = err;
        this.loading = false;
      }
    )
  }

  deleteApp(id: string) {
    console.log(id)
    this.appointmentsService.cancelAppointment(id)
      .pipe(
        mergeMap(()=> this.appointmentsService.getAppointments())
      )
      .subscribe(
        res => {
          this.appointments = res;
          this.successMsg = "cancelled went ok"
        }
      )
  }

}
