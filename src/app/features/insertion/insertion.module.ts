import { NgModule } from '@angular/core';
import { InsertionsListComponent } from './components/insertions-list/insertions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddInsertionComponent } from './components/add-insertion/add-insertion.component';


@NgModule({
  declarations: [
    InsertionsListComponent,
    AddInsertionComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InsertionModule { }
