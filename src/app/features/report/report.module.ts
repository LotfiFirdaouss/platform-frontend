import { NgModule } from '@angular/core';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { ReportInfoComponent } from './components/report-info/report-info.component';
import { ReportStudentComponent } from './components/report-student/report-student.component';



@NgModule({
  declarations: [
    ReportsListComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,
  ],
  imports: [
    SharedModule,
    AddReportComponent
  ]
})
export class ReportModule { }
