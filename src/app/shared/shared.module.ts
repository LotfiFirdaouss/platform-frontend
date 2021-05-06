import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'; // CLI imports 
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticeSliderComponent } from './components/notice-slider/notice-slider.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    AppRoutingModule,
    RouterModule
  ]
})
export class SharedModule { }
