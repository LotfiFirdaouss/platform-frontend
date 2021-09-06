import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/auth/guards/admin.guard";
import { AddStudentComponent } from "./components/add-student/add-student.component";
import { StudentDetailsComponent } from "./components/student-details/student-details.component";


const routes: Routes = [
  { path :'' , component : StudentDetailsComponent, canActivate : [AdminGuard]},
  { path :'ajouter' , component : AddStudentComponent, canActivate : [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }