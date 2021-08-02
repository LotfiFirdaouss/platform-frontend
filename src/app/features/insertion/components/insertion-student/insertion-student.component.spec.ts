import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionStudentComponent } from './insertion-student.component';

describe('InsertionStudentComponent', () => {
  let component: InsertionStudentComponent;
  let fixture: ComponentFixture<InsertionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertionStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
