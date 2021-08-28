import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/guards/auth.guard";
import { StudGuard } from "src/app/auth/guards/stud.guard";
import { AddInsertionComponent } from "./components/add-insertion/add-insertion.component";
import { InsertionDetailsComponent } from "./components/insertion-details/insertion-details.component";
import { InsertionInfoComponent } from "./components/insertion-info/insertion-info.component";
import { InsertionStudentComponent } from "./components/insertion-student/insertion-student.component";
import { InsertionsListComponent } from "./components/insertions-list/insertions-list.component";


const routes: Routes = [
  { path: '' , component: InsertionsListComponent,canActivate : [AuthGuard]},
  { path: 'ajouter' , component: AddInsertionComponent,canActivate : [AuthGuard, StudGuard]},
  { path: ':id', component: InsertionDetailsComponent,canActivate : [AuthGuard] },
  { path: 'info/:id', component: InsertionInfoComponent,canActivate : [AuthGuard] },
  { path: 'etudiant/:etudiant', component: InsertionStudentComponent,canActivate : [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsertionRoutingModule { }