import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsShellComponent } from './appointments-shell.component';

describe('AppointmentsShellComponent', () => {
  let component: AppointmentsShellComponent;
  let fixture: ComponentFixture<AppointmentsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
