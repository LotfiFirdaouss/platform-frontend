import { NgModule } from '@angular/core';
import { InsertionsListComponent } from './components/insertions-list/insertions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddInsertionComponent } from './components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from './components/insertion-details/insertion-details.component';


@NgModule({
  declarations: [
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InsertionModule { }
