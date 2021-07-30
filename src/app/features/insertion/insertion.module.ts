import { NgModule } from '@angular/core';
import { InsertionsListComponent } from './components/insertions-list/insertions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InsertionsListComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InsertionModule { }
