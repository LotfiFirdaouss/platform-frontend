import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportJuryComponent } from './report-jury.component';

describe('ReportJuryComponent', () => {
  let component: ReportJuryComponent;
  let fixture: ComponentFixture<ReportJuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportJuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
