import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/auth/guards/admin.guard";
import { AddProfessorComponent } from './components/add-professor/add-professor.component';
import { ProfessorDetailsComponent } from './components/professor-details/professor-details.component';


const routes: Routes = [
  { path :'' , component : ProfessorDetailsComponent, canActivate : [AdminGuard]},
  { path :'ajouter' , component : AddProfessorComponent, canActivate : [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }