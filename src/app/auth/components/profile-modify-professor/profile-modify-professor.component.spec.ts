import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModifyProfessorComponent } from './profile-modify-professor.component';

describe('ProfileModifyProfessorComponent', () => {
  let component: ProfileModifyProfessorComponent;
  let fixture: ComponentFixture<ProfileModifyProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileModifyProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModifyProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
