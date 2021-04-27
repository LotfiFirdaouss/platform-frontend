import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeSliderComponent } from './notice-slider.component';

describe('NoticeSliderComponent', () => {
  let component: NoticeSliderComponent;
  let fixture: ComponentFixture<NoticeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
