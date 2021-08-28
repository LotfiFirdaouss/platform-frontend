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

const routes: Routes = [

  //not connected 
  { path : '' , component : WelcomePageComponent},
  { path :'login' , component : LoginComponent},
  { path :'register' , component : RegisterComponent},
  { path :'contact' , component : ContactPageComponent},
  { path :'à-propos' , component : AProposPageComponent},

  //protected routes: connected
  { path :'profile' , component : ProfileComponent, canActivate : [AuthGuard]},
  { path :'profile-etudiant/:id' , component : ProfileEtudiantComponent, canActivate : [AuthGuard]}, //id_etudiant
  { 
    path: 'home' ,  
    loadChildren: () => import('./features/report/report.module').then(mod => mod.ReportModule),
    canActivate : [AuthGuard]
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
    path: 'étudiant' ,  
    loadChildren: () => import('./features/student/student.module').then(mod => mod.StudentModule),
    canActivate : [AdminGuard]
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
