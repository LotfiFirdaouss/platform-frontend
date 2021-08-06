import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ReportsListComponent } from './features/report/components/reports-list/reports-list.component';
import { AddReportComponent } from './features/report/components/add-report/add-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportDetailsComponent } from './features/report/components/report-details/report-details.component';
import { ReportInfoComponent } from './features/report/components/report-info/report-info.component';
import { ReportStudentComponent } from './features/report/components/report-student/report-student.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportsListComponent,
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
