import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { ReportsListComponent } from './features/report/components/reports-list/reports-list.component';
const routes: Routes = [
  { path : '' , component : WelcomePageComponent},
  { path : 'login' , component : LoginPageComponent},
  { path: 'list' , component: ReportsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
