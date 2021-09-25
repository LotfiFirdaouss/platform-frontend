import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportValidationComponent } from './report-validation.component';

describe('ReportValidationComponent', () => {
  let component: ReportValidationComponent;
  let fixture: ComponentFixture<ReportValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
