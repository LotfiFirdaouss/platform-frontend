import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionsListComponent } from './insertions-list.component';

describe('InsertionsListComponent', () => {
  let component: InsertionsListComponent;
  let fixture: ComponentFixture<InsertionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
