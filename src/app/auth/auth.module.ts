import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { ProfileModifyComponent } from './components/profile-modify/profile-modify.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ResponseResetComponent,
    ProfileModifyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class AuthModule { }
