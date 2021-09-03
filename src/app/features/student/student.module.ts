import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [],
  imports: [
    StudentRoutingModule,
    SharedModule
  ],
})
export class StudentModule { }
