import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Appointment } from '../models/appointment';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  @Input() appointments: Appointment;
  @Input() loading = true;
  @Input() error: boolean;
  @Output() deleteApp = new EventEmitter();
  columns = ['appointmentDate','name', 'email', 'edit', 'cancel'];


  constructor() { }

  ngOnInit(): void {
  }

  handleDeleteApp(id: string) {
    this.deleteApp.emit(id)
  }
}
