import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'; // CLI imports 
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticeSliderComponent } from './components/notice-slider/notice-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { InsertionsListComponent } from '../features/insertion/components/insertions-list/insertions-list.component';
import { ReportsListComponent } from '../features/report/components/reports-list/reports-list.component';
import { AddInsertionComponent } from '../features/insertion/components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from '../features/insertion/components/insertion-details/insertion-details.component';
import { InsertionInfoComponent } from '../features/insertion/components/insertion-info/insertion-info.component';
import { InsertionStudentComponent } from '../features/insertion/components/insertion-student/insertion-student.component';
import { AddReportComponent } from '../features/report/components/add-report/add-report.component';
import { ReportInfoComponent } from '../features/report/components/report-info/report-info.component';
import { ReportDetailsComponent } from '../features/report/components/report-details/report-details.component';
import { ReportStudentComponent } from '../features/report/components/report-student/report-student.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegisterComponent } from '../auth/components/register/register.component';
import { ProfileComponent } from '../auth/components/profile/profile.component';
import { ReportFilterPipe } from '../features/report/pipes/report-filter.pipe';
import { StageProjetFilterPipe } from '../features/report/pipes/stage-projet-filter.pipe';
import { ConfidentielFilterPipe } from '../features/report/pipes/confidentiel-filter.pipe';
import { ReportTypeFilterPipe } from '../features/report/pipes/report-type-filter.pipe';
import { DateRangeFilterPipe } from '../features/report/pipes/date-range-filter.pipe';
import { StudentFilterPipe } from '../features/report/pipes/student-filter.pipe';
import { VillePaysFilterPipe } from '../features/report/pipes/ville-pays-filter.pipe';
import { SocieteFilterPipe } from '../features/report/pipes/societe-filter.pipe';
import { SecteurSocieteFilterPipe } from '../features/report/pipes/secteur-societe-filter.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    InsertionsListComponent,
    ReportsListComponent,
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ReportFilterPipe,
    StageProjetFilterPipe,
    ConfidentielFilterPipe,
    ReportTypeFilterPipe,
    DateRangeFilterPipe,
    StudentFilterPipe,
    VillePaysFilterPipe,
    SocieteFilterPipe,
    SecteurSocieteFilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    AppRoutingModule,
    RouterModule,    
  ]
})
export class SharedModule { }
