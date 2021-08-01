import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';

import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { RegisterPageComponent } from './core/components/register-page/register-page.component';

import { ReportsListComponent } from './features/report/components/reports-list/reports-list.component';
import {InsertionsListComponent  } from './features/insertion/components/insertions-list/insertions-list.component';

import { NoticeSliderComponent } from './shared/components/notice-slider/notice-slider.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AddInsertionComponent } from './features/insertion/components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from './features/insertion/components/insertion-details/insertion-details.component';


const routes: Routes = [
  { path : '' , component : WelcomePageComponent},
  
  { path : 'login' , component : LoginPageComponent},
  { path : 'register' , component : RegisterPageComponent},

  { path: 'list' , component: ReportsListComponent},

  //insertions
  { path: 'insertions' , component: InsertionsListComponent},
  { path: 'add-insertion' , component: AddInsertionComponent},
  { path: 'insertions/:id', component: InsertionDetailsComponent },

  { path: 'notice-slider' , component: NoticeSliderComponent},
  { path: 'menu' , component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
