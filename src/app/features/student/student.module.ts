import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeStudentComponent } from './pages/home-student/home-student.component';



@NgModule({
  declarations: [
    HomeStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentModule { }
