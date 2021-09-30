import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

import { SharedModule } from '../shared/shared.module';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { AProposPageComponent } from './components/a-propos-page/a-propos-page.component';
import { WebMastersComponent } from './components/web-masters/web-masters.component';


@NgModule({
  declarations: [
    WelcomePageComponent,
    ContactPageComponent,
    AProposPageComponent,
    WebMastersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WelcomePageComponent,
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
