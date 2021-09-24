import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProfessorValidationComponent } from './report-professor-validation.component';

describe('ReportProfessorValidationComponent', () => {
  let component: ReportProfessorValidationComponent;
  let fixture: ComponentFixture<ReportProfessorValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProfessorValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProfessorValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
