import { NgModule } from '@angular/core';
import { InsertionsListComponent } from './components/insertions-list/insertions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddInsertionComponent } from './components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from './components/insertion-details/insertion-details.component';
import { InsertionInfoComponent } from './components/insertion-info/insertion-info.component';
import { InsertionStudentComponent } from './components/insertion-student/insertion-student.component';


@NgModule({
  declarations: [
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InsertionModule { }
