import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ReportStatsComponent } from './components/report-stats/report-stats.component';
import { ReportStatsNamePipe } from './pipes/report-stats-name.pipe';
// import { PaginationPipe } from './pipes/pagination.pipe';


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
    ReportStatsComponent,
    ReportStatsNamePipe,
    //PaginationPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ReportModule { }
