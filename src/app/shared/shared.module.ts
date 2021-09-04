import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'; // CLI imports 
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticeSliderComponent } from './components/notice-slider/notice-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { InsertionsListComponent } from '../features/insertion/components/insertions-list/insertions-list.component';
import { ReportsListComponent } from '../features/report/components/reports-list/reports-list.component';
import { AddInsertionComponent } from '../features/insertion/components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from '../features/insertion/components/insertion-details/insertion-details.component';
import { InsertionInfoComponent } from '../features/insertion/components/insertion-info/insertion-info.component';
import { InsertionStudentComponent } from '../features/insertion/components/insertion-student/insertion-student.component';
import { AddReportComponent } from '../features/report/components/add-report/add-report.component';
import { ReportInfoComponent } from '../features/report/components/report-info/report-info.component';
import { ReportDetailsComponent } from '../features/report/components/report-details/report-details.component';
import { ReportStudentComponent } from '../features/report/components/report-student/report-student.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegisterComponent } from '../auth/components/register/register.component';
import { ProfileComponent } from '../auth/components/profile/profile.component';
import { ReportFilterPipe } from '../features/report/pipes/report-filter.pipe';
import { StageProjetFilterPipe } from '../features/report/pipes/stage-projet-filter.pipe';
import { ConfidentielFilterPipe } from '../features/report/pipes/confidentiel-filter.pipe';
import { ReportTypeFilterPipe } from '../features/report/pipes/report-type-filter.pipe';
import { DateRangeFilterPipe } from '../features/report/pipes/date-range-filter.pipe';
import { StudentFilterPipe } from '../features/report/pipes/student-filter.pipe';
import { VillePaysFilterPipe } from '../features/report/pipes/ville-pays-filter.pipe';
import { SocieteFilterPipe } from '../features/report/pipes/societe-filter.pipe';
import { SecteurSocieteFilterPipe } from '../features/report/pipes/secteur-societe-filter.pipe';
// import { HelloComponent } from '../features/report/components/reports-list/hello.component';
// import { PaginationPipe } from '../features/report/pipes/pagination.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { RequestResetComponent } from '../auth/components/request-reset/request-reset.component';
import { ResponseResetComponent } from '../auth/components/response-reset/response-reset.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FiliereFilterPipe } from '../features/report/pipes/filiere-filter.pipe';
import { PromotionFilterPipe } from '../features/report/pipes/promotion-filter.pipe';
import { EtudiantFilterPipe } from '../features/insertion/pipes/etudiant-filter.pipe';
import { PromotionInsertionFilterPipe } from '../features/insertion/pipes/promotion-insertion-filter.pipe';
import { FiliereInsertionFilterPipe } from '../features/insertion/pipes/filiere-insertion-filter.pipe';
import { InsertionTypeFilterPipe } from '../features/insertion/pipes/insertion-type-filter.pipe';
import { VilleInsertionFilterPipe } from '../features/insertion/pipes/ville-insertion-filter.pipe';
import { PaysInsertionFilterPipe } from '../features/insertion/pipes/pays-insertion-filter.pipe';
import { SocieteInsertionFilterPipe } from '../features/insertion/pipes/societe-insertion-filter.pipe';
import { PosteInsertionFilterPipe } from '../features/insertion/pipes/poste-insertion-filter.pipe';
import { UnivInsertionFilterPipe } from '../features/insertion/pipes/univ-insertion-filter.pipe';
import { NatFormationInsertionFilterPipe } from '../features/insertion/pipes/nat-formation-insertion-filter.pipe';
import { IntitFormationInsertionFilterPipe } from '../features/insertion/pipes/intit-formation-insertion-filter.pipe';
import { ExportService } from '../core/services/export.service';
import { ReportStatsComponent } from '../features/report/components/report-stats/report-stats.component';
import { ReportStatsNamePipe } from '../features/report/pipes/report-stats-name.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    InsertionsListComponent,
    ReportsListComponent,
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,
    LoginComponent,
    RequestResetComponent,
    ResponseResetComponent,
    RegisterComponent,
    ProfileComponent,
    ReportStatsComponent,
    //Repots filters
    ReportFilterPipe,
    StageProjetFilterPipe,
    ConfidentielFilterPipe,
    ReportTypeFilterPipe,
    DateRangeFilterPipe,
    StudentFilterPipe,
    VillePaysFilterPipe,
    SocieteFilterPipe,
    SecteurSocieteFilterPipe,
    SpinnerComponent,
    PromotionFilterPipe,
    FiliereFilterPipe,
    //insertion filters
    EtudiantFilterPipe,
    PromotionInsertionFilterPipe,
    FiliereInsertionFilterPipe,
    InsertionTypeFilterPipe,
    VilleInsertionFilterPipe,
    PaysInsertionFilterPipe,
    SocieteInsertionFilterPipe,
    PosteInsertionFilterPipe,
    UnivInsertionFilterPipe,
    NatFormationInsertionFilterPipe,
    IntitFormationInsertionFilterPipe,
    /////////////
    ReportStatsNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule, 
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,
    AppRoutingModule,
    RouterModule,  
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [
    ExportService
  ]
})
export class SharedModule { }
