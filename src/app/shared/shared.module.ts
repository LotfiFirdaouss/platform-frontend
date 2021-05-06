import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'; // CLI imports 
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
<<<<<<< HEAD
import { MenuComponent } from './components/menu/menu.component';
=======
import { NoticeSliderComponent } from './components/notice-slider/notice-slider.component';
>>>>>>> 7f615240bfd41864ed81e711cc484cd9f254a47f



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
<<<<<<< HEAD
    MenuComponent
=======
    NoticeSliderComponent
>>>>>>> 7f615240bfd41864ed81e711cc484cd9f254a47f
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
<<<<<<< HEAD
    MenuComponent
=======
    NoticeSliderComponent,
    AppRoutingModule,
    RouterModule
>>>>>>> 7f615240bfd41864ed81e711cc484cd9f254a47f
  ]
})
export class SharedModule { }
