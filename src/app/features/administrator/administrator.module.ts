import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministratorRoutingModule } from './administrator-routing.module';

@NgModule({
  declarations: [
    ],
  imports: [
    AdministratorRoutingModule,
    SharedModule
  ]
})
export class AdministratorModule { }
