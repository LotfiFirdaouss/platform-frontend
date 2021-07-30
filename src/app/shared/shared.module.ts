import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'; // CLI imports 
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticeSliderComponent } from './components/notice-slider/notice-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { InsertionsListComponent } from '../features/insertion/components/insertions-list/insertions-list.component';
import { ReportsListComponent } from '../features/report/components/reports-list/reports-list.component';
import { AddInsertionComponent } from '../features/insertion/components/add-insertion/add-insertion.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    InsertionsListComponent,
    ReportsListComponent,
    AddInsertionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    AppRoutingModule,
    RouterModule,
  ]
})
export class SharedModule { }
