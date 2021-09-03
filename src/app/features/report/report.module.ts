import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportFilterPipe } from './pipes/report-filter.pipe';
import { StageProjetFilterPipe } from './pipes/stage-projet-filter.pipe';
import { ConfidentielFilterPipe } from './pipes/confidentiel-filter.pipe';
import { ReportTypeFilterPipe } from './pipes/report-type-filter.pipe';
import { DateRangeFilterPipe } from './pipes/date-range-filter.pipe';
import { StudentFilterPipe } from './pipes/student-filter.pipe';
import { VillePaysFilterPipe } from './pipes/ville-pays-filter.pipe';
import { SocieteFilterPipe } from './pipes/societe-filter.pipe';
import { SecteurSocieteFilterPipe } from './pipes/secteur-societe-filter.pipe';
import { PromotionFilterPipe } from './pipes/promotion-filter.pipe';
import { FiliereFilterPipe } from './pipes/filiere-filter.pipe';


@NgModule({
  declarations: [
    ReportFilterPipe,
    StageProjetFilterPipe,
    ConfidentielFilterPipe,
    ReportTypeFilterPipe,
    DateRangeFilterPipe,
    StudentFilterPipe,
    VillePaysFilterPipe,
    SocieteFilterPipe,
    SecteurSocieteFilterPipe,
    PromotionFilterPipe,
    FiliereFilterPipe,
    //PaginationPipe
  ],
  imports: [
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
