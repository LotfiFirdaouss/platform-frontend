import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/guards/auth.guard";
import { AdminGuard } from "src/app/auth/guards/admin.guard";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormManagementComponent } from "./components/form-management/form-management.component";
import { ReportStatsComponent } from "./components/report-stats/report-stats.component";
import { ReportValidationComponent } from "./components/report-validation/report-validation.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuard, AdminGuard] },
  { path: 'gestionForm' , component: FormManagementComponent,canActivate : [AuthGuard,AdminGuard]},
  { path: 'stats' , component: ReportStatsComponent,canActivate : [AuthGuard, AdminGuard]},
  { path: 'reportValid' , component: ReportValidationComponent,canActivate : [AuthGuard, AdminGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }