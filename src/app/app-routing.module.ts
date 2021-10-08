import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';

import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { ContactPageComponent } from './core/components/contact-page/contact-page.component';
import { AProposPageComponent } from './core/components/a-propos-page/a-propos-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ProfileEtudiantComponent } from './features/student/components/profile-etudiant/profile-etudiant.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { RequestResetComponent } from './auth/components/request-reset/request-reset.component';
import { ResponseResetComponent } from './auth/components/response-reset/response-reset.component';
import { WebMastersComponent } from './core/components/web-masters/web-masters.component';
import { ProfileModifyComponent } from './auth/components/profile-modify/profile-modify.component';

const routes: Routes = [

  //not connected 
  { path : '' , component : WelcomePageComponent},
  { path :'login' , component : LoginComponent},
  { path :'register' , component : RegisterComponent},
  { path :'contact' , component : ContactPageComponent},
  { path :'à-propos' , component : AProposPageComponent},
  { path :'web-masters' , component : WebMastersComponent},
  { path: 'request-reset-password', component: RequestResetComponent},
  { path: 'response-reset-password/response/:email/:token',component: ResponseResetComponent},

  //protected routes: connected
  { path :'profile' , component : ProfileComponent, canActivate : [AuthGuard]},
  { path :'modifier-profile' , component : ProfileModifyComponent, canActivate : [AuthGuard]},
  { path :'profile-etudiant/:id' , component : ProfileEtudiantComponent, canActivate : [AuthGuard]}, //id_etudiant
  
  { 
    path: 'admin' ,  
    loadChildren: () => import('./features/administrator/administrator.module').then(mod => mod.AdministratorModule),
    canActivate : [AdminGuard]
  },

  //reports
  { 
    path: 'rapport' ,  
    loadChildren: () => import('./features/report/report.module').then(mod => mod.ReportModule),
    canActivate : [AuthGuard]
  },

  //insertions
  { 
    path: 'insertion' ,  
    loadChildren: () => import('./features/insertion/insertion.module').then(mod => mod.InsertionModule),
    canActivate : [AuthGuard]
  },

  //students
  { 
    path: 'etudiant' ,  
    loadChildren: () => import('./features/student/student.module').then(mod => mod.StudentModule),
    canActivate : [AdminGuard]
  },

  //professors
  { 
    path: 'professeur' ,  
    loadChildren: () => import('./features/professor/professor.module').then(mod => mod.ProfessorModule)
  },


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
