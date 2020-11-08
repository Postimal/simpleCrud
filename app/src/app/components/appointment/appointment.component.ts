import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentsService } from '../../appointments.service'
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @ViewChild('form') form : NgForm;
  appointmentForm: FormGroup;
  successMsg: string;
  appoinmentId: string;
  appointmentDetails: Appointment;
  error: boolean;
  constructor(
    private appointmentsService: AppointmentsService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      appointmentDate: ["", Validators.required],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    })

    this.route.params.subscribe( params =>
      this.appoinmentId = params["id"]
    );

    this.appoinmentId && this.getDetails(this.appoinmentId);
  }

  addAppointments({appointmentDate, name , email } : Appointment){
    this.appointmentsService.createAppointment(appointmentDate, name , email)
      .subscribe(                //   WAZNE!!! ZAWSZE MUSI BYC SUBSCRIBE PO kazdej AKCJI NA BACKEND ZEBY TO DZIALALO
        (createdAppointment: Appointment) => {
          const date = new Date(createdAppointment.appointmentDate).toDateString()
          this.successMsg = `add appointment at ${date} successfully`
        },
        error => {
          this.error = error
        }
    )
  }

  getDetails(id: string) {
    this.appointmentsService.getAppointmentDetails(id).subscribe(
      (appoinment: Appointment) => {
        this.appointmentDetails = appoinment;
        this.editProduct(appoinment);
      },
      error => {
        this.error = error
      }
    )
  }

  editProduct({ appointmentDate, name , email }: Appointment): void {
    // const year = new Date(appointmentDate).getFullYear();
    // const month = new Date(appointmentDate).getMonth();  // inne rozwiazanie mozna dopracowac, ale new DATE rozwiazuje problem
    // const days = new Date(appointmentDate).getDay();

    this.appointmentForm.patchValue({
      // appointmentDate: new Date(`${days}/${month}/${year}`),
      appointmentDate: new Date(appointmentDate),   // << new DATE HERE //////////
      name,
      email
    })
  }

  updateAppointment({appointmentDate, name , email } : Appointment) {
    this.appointmentsService.updateAppointment(appointmentDate, name , email, this.appoinmentId)
    .subscribe(
      res => {
        this.successMsg = `edited appointment ${res.ok === 1 ? "success" : "failed"}`;
      },
      error => {
        this.error = error;
      }
    )
  }

  onSubmit(): void{
    if(this.router.url.includes('edit')){
      this.updateAppointment(this.appointmentForm.value);
    } else this.addAppointments(this.appointmentForm.value);
    // this.appointmentForm.reset();   <<<===    // to jest niepotrzebne gdy resetuje formularz za pomcoa @Viewchild(daje taka
    //  korzysc ze restuje html z materiala)
    this.form.resetForm();
  }

}
