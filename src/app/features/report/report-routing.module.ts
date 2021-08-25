import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';


const routes: Routes = [
  { path: '', component: ReportsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }