import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/guards/auth.guard";
import { AdminGuard } from "src/app/auth/guards/admin.guard";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormManagementComponent } from "./components/form-management/form-management.component";

const routes: Routes = [
  { path: 'gestionForm' , component: FormManagementComponent,canActivate : [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }