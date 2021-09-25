import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/auth/guards/admin.guard";
import { ProfGuard } from "src/app/auth/guards/prof.guard";
import { AddProfessorComponent } from './components/add-professor/add-professor.component';
import { ProfessorDetailsComponent } from './components/professor-details/professor-details.component';
import { ReportJuryComponent } from "./components/report-jury/report-jury.component";


const routes: Routes = [
  { path :'' , component : ProfessorDetailsComponent, canActivate : [AdminGuard]},
  { path :'ajouter' , component : AddProfessorComponent, canActivate : [AdminGuard]},
  { path :'jury' , component : ReportJuryComponent, canActivate : [ProfGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }