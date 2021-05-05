import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WelcomePageComponent,
    BannerComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WelcomePageComponent,
    BannerComponent,
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
  /** The Core Module should be imported from the root module only, 
   * therefore we are adding a conditional inside the constructor to check it. */
}
