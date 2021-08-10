import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AProposPageComponent } from './a-propos-page.component';

describe('AProposPageComponent', () => {
  let component: AProposPageComponent;
  let fixture: ComponentFixture<AProposPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AProposPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AProposPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
