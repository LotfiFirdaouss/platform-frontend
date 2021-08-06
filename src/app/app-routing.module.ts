import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { ReportsListComponent } from './features/report/components/reports-list/reports-list.component';
import { AddReportComponent } from './features/report/components/add-report/add-report.component';
import { ReportDetailsComponent } from './features/report/components/report-details/report-details.component';
import { ReportInfoComponent } from './features/report/components/report-info/report-info.component';
import { ReportStudentComponent } from './features/report/components/report-student/report-student.component';
const routes: Routes = [
  { path : '' , component : WelcomePageComponent},
  { path :'login' , component : LoginPageComponent},
  { path: 'rapports' , component: ReportsListComponent},
  { path: 'add-rapport' , component: AddReportComponent},
  { path: 'rapport-details/:id' , component: ReportDetailsComponent},
  { path: 'rapport-info/:id', component: ReportInfoComponent},
  { path: 'rapport-etudiant', component:ReportStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
