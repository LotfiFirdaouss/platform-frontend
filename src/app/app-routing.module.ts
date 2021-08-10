import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';

import {InsertionsListComponent  } from './features/insertion/components/insertions-list/insertions-list.component';

import { NoticeSliderComponent } from './shared/components/notice-slider/notice-slider.component';
import { MenuComponent } from './shared/components/menu/menu.component';

import { AddInsertionComponent } from './features/insertion/components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from './features/insertion/components/insertion-details/insertion-details.component';
import { InsertionInfoComponent } from './features/insertion/components/insertion-info/insertion-info.component';
import { InsertionStudentComponent } from './features/insertion/components/insertion-student/insertion-student.component';

import { ReportsListComponent } from './features/report/components/reports-list/reports-list.component';
import { AddReportComponent } from './features/report/components/add-report/add-report.component';
import { ReportDetailsComponent } from './features/report/components/report-details/report-details.component';
import { ReportInfoComponent } from './features/report/components/report-info/report-info.component';
import { ReportStudentComponent } from './features/report/components/report-student/report-student.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
const routes: Routes = [

  
  { path : '' , component : WelcomePageComponent},
  { path :'login' , component : LoginComponent},
  { path :'register' , component : RegisterComponent},
  
  //reports
  { path: 'rapports' , component: ReportsListComponent},
  { path: 'add-rapport' , component: AddReportComponent},
  { path: 'rapport-details/:id' , component: ReportDetailsComponent},
  { path: 'rapport-info/:id', component: ReportInfoComponent},
  { path: 'rapport-etudiant/:etudiant', component:ReportStudentComponent},

  //insertions
  { path: 'insertions' , component: InsertionsListComponent},
  { path: 'add-insertion' , component: AddInsertionComponent},
  { path: 'insertions/:id', component: InsertionDetailsComponent },
  { path: 'insertions/insertion-info/:id', component: InsertionInfoComponent },
  { path: 'insertions/insertion-etudiant/:etudiant', component: InsertionStudentComponent },


  { path: 'notice-slider' , component: NoticeSliderComponent},
  { path: 'menu' , component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
