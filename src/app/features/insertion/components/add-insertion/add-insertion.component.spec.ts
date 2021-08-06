import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsertionComponent } from './add-insertion.component';

describe('AddInsertionComponent', () => {
  let component: AddInsertionComponent;
  let fixture: ComponentFixture<AddInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
