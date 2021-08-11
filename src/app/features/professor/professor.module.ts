import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeProfessorComponent } from './pages/home-professor/home-professor.component';



@NgModule({
  declarations: [
    HomeProfessorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ProfessorModule { }
