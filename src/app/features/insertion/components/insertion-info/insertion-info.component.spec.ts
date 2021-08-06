import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionInfoComponent } from './insertion-info.component';

describe('InsertionInfoComponent', () => {
  let component: InsertionInfoComponent;
  let fixture: ComponentFixture<InsertionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
