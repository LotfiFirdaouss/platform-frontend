import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterPipe } from './pipes/report-filter.pipe';


@NgModule({
  declarations: [
    ReportFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ReportModule { }
