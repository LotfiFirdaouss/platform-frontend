import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';

import {InsertionsListComponent  } from './features/insertion/components/insertions-list/insertions-list.component';

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
import { ProfileComponent } from './auth/components/profile/profile.component';
import { ContactPageComponent } from './core/components/contact-page/contact-page.component';
import { AProposPageComponent } from './core/components/a-propos-page/a-propos-page.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { ProfGuard } from './auth/guards/prof.guard';
import { StudGuard } from './auth/guards/stud.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { ProfileEtudiantComponent } from './features/student/components/profile-etudiant/profile-etudiant.component';
import { RequestResetComponent } from './auth/components/request-reset/request-reset.component';
import { ResponseResetComponent } from './auth/components/response-reset/response-reset.component';

const routes: Routes = [

  //not connected 
  { path : '' , component : WelcomePageComponent},
  { path :'login' , component : LoginComponent},
  { path :'register' , component : RegisterComponent},
  { path :'contact' , component : ContactPageComponent},
  { path :'à-propos' , component : AProposPageComponent},
  { path: 'request-reset-password', component: RequestResetComponent},
  { path: 'response-reset-password/response/:email/:token',component: ResponseResetComponent},

  //protected routes: connected
  { path :'profile' , component : ProfileComponent, canActivate : [AuthGuard]},
  { path :'profile-etudiant/:id' , component : ProfileEtudiantComponent, canActivate : [AuthGuard]}, //id_etudiant
  { path :'home' , component : ReportsListComponent, canActivate : [AuthGuard]},

  //reports
  { path: 'rapports' , component: ReportsListComponent,canActivate : [AuthGuard]},
  { path: 'add-rapport' , component: AddReportComponent,canActivate : [AuthGuard, StudGuard]},
  { path: 'rapports/:id' , component: ReportDetailsComponent,canActivate : [AuthGuard]},
  { path: 'rapport-info/:id', component: ReportInfoComponent,canActivate : [AuthGuard]},
  { path: 'rapport-etudiant/:etudiant', component:ReportStudentComponent,canActivate : [AuthGuard]},

  //insertions
  { path: 'insertions' , component: InsertionsListComponent,canActivate : [AuthGuard]},
  { path: 'add-insertion' , component: AddInsertionComponent,canActivate : [AuthGuard, StudGuard]},
  { path: 'insertions/:id', component: InsertionDetailsComponent,canActivate : [AuthGuard] },
  { path: 'insertions/insertion-info/:id', component: InsertionInfoComponent,canActivate : [AuthGuard] },
  { path: 'insertion-etudiant/:etudiant', component: InsertionStudentComponent,canActivate : [AuthGuard] },


  //temporary routes (just to visualize the components)
  // { path: 'notice-slider' , component: NoticeSliderComponent},
  // { path: 'menu' , component: MenuComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
