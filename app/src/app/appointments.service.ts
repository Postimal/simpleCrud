import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Appointment } from './components/models/appointment';
import { environment } from 'src/environments/environment'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  SERVER_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.SERVER_URL}/appointments`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public  createAppointment(appointmentDate: string, name: string, email: string) {
    const body = {appointmentDate, name, email};
    return this.http.post<Appointment>(`${this.SERVER_URL}/appointments/add`, body )
      .pipe(
        catchError(this.handleError)
      )
  }

  public cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.SERVER_URL}/appointments/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getAppointmentDetails(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.SERVER_URL}/appointments/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public updateAppointment(appointmentDate: string, name: string, email: string, id: string) {
    const body = {appointmentDate, name, email, id};
    return this.http.put<any>(`${this.SERVER_URL}/appointments/edit/${id}`, body)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(e: HttpErrorResponse) {
    if (e.status && e.error.message) {
      return throwError(e.error.message)
    }
    return throwError("Problem with API")
  }
}
