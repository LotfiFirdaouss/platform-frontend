import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { ProfessorModule } from './features/professor/professor.module';
import { StudentModule } from './features/student/student.module';
import { AdministratorModule } from './features/administrator/administrator.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ProfessorModule,
    StudentModule,
    AdministratorModule
    
  ],
  providers: [DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '622324065144-q905qvd67f2gt2opagon90npqs0qd4pg.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
