import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterPipe } from './pipes/report-filter.pipe';
import { StageProjetFilterPipe } from './pipes/stage-projet-filter.pipe';
import { ConfidentielFilterPipe } from './pipes/confidentiel-filter.pipe';
import { ReportTypeFilterPipe } from './pipes/report-type-filter.pipe';
import { DateRangeFilterPipe } from './pipes/date-range-filter.pipe';


@NgModule({
  declarations: [
    ReportFilterPipe,
    StageProjetFilterPipe,
    ConfidentielFilterPipe,
    ReportTypeFilterPipe,
    DateRangeFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ReportModule { }
