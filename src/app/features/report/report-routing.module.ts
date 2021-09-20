import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/auth/guards/admin.guard';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { StudGuard } from 'src/app/auth/guards/stud.guard';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { ReportInfoComponent } from './components/report-info/report-info.component';
import { ReportStudentComponent } from './components/report-student/report-student.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';

//the order is important !!
const routes: Routes = [
  { path: '', component: ReportsListComponent,canActivate : [AuthGuard] },
  { path: 'ajouter' , component: AddReportComponent,canActivate : [AuthGuard, StudGuard]},
  { path: ':id' , component: ReportDetailsComponent,canActivate : [AuthGuard]},
  { path: 'info/:id', component: ReportInfoComponent,canActivate : [AuthGuard]},
  { path: 'etudiant/:etudiant', component:ReportStudentComponent,canActivate : [AuthGuard]},
  //print Excel
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }