import { NgModule } from '@angular/core';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class ReportModule { }
