import { NgModule } from '@angular/core';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllFiltersInPipe } from './pipes/all-filters-in.pipe';

@NgModule({
  declarations: [
  
    AllFiltersInPipe
  ],
  imports: [
    SharedModule,
    AdministratorRoutingModule,
  ]
})
export class AdministratorModule { }
