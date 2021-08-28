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
import { ProfileEtudiantComponent } from '../features/student/components/profile-etudiant/profile-etudiant.component';
import { StudentDetailsComponent } from '../features/student/components/student-details/student-details.component';
import { AddStudentComponent } from '../features/student/components/add-student/add-student.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,

    //reports
    ReportsListComponent,
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,

    //insertions
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,

    //students
    ProfileEtudiantComponent,
    AddStudentComponent,
    StudentDetailsComponent,

    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,      
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,


    //reports
    ReportsListComponent, 
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,


    //insertions
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,

    //students
    ProfileEtudiantComponent,
    AddStudentComponent,
    StudentDetailsComponent,

    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,   
  ]
})
export class SharedModule { }
