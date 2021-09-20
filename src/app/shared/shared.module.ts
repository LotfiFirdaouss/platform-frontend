import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticeSliderComponent } from './components/notice-slider/notice-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ProfileEtudiantComponent } from '../features/student/components/profile-etudiant/profile-etudiant.component';
import { StudentDetailsComponent } from '../features/student/components/student-details/student-details.component';
import { AddStudentComponent } from '../features/student/components/add-student/add-student.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AddProfessorComponent } from '../features/professor/components/add-professor/add-professor.component';
import { ProfessorDetailsComponent } from '../features/professor/components/professor-details/professor-details.component';
import { ReportFilterPipe } from '../features/report/pipes/report-filter.pipe';
import { StageProjetFilterPipe } from '../features/report/pipes/stage-projet-filter.pipe';
import { ConfidentielFilterPipe } from '../features/report/pipes/confidentiel-filter.pipe';
import { ReportTypeFilterPipe } from '../features/report/pipes/report-type-filter.pipe';
import { DateRangeFilterPipe } from '../features/report/pipes/date-range-filter.pipe';
import { StudentFilterPipe } from '../features/report/pipes/student-filter.pipe';
import { VillePaysFilterPipe } from '../features/report/pipes/ville-pays-filter.pipe';
import { SocieteFilterPipe } from '../features/report/pipes/societe-filter.pipe';
import { SecteurSocieteFilterPipe } from '../features/report/pipes/secteur-societe-filter.pipe';
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
import { NomStudentFilterPipe } from '../features/student/pipes/nom-filter.pipe';
import { PromotionStudentFilterPipe } from '../features/student/pipes/promotion-filter.pipe';
import { FiliereStudentFilterPipe } from '../features/student/pipes/filiere-filter.pipe';
import { NomProfFilterPipe } from '../features/professor/pipes/nom-prof-filter.pipe';
import { DepartementProfFilterPipe } from '../features/professor/pipes/departement-prof-filter.pipe';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from '../features/administrator/components/dashboard/dashboard.component';
import { PromotionFilterDashboardPipe } from '../features/administrator/pipes/promotion-filter.pipe';
import { ReportStatsComponent } from '../features/administrator/components/report-stats/report-stats.component';
import { FormManagementComponent } from '../features/administrator/components/form-management/form-management.component';
import { ExportService } from '../features/administrator/services/export.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,

    //reports
    ReportsListComponent,
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,
    

    //insertions
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,

    //students
    ProfileEtudiantComponent,
    AddStudentComponent,
    StudentDetailsComponent,

    //studentsFilters
    NomStudentFilterPipe,
    PromotionStudentFilterPipe,
    FiliereStudentFilterPipe,

    //professors
    AddProfessorComponent,
    ProfessorDetailsComponent,

    //professorsFilters
    NomProfFilterPipe,
    DepartementProfFilterPipe,

    //dashboardFilters
    PromotionFilterDashboardPipe,


    //Admin components
    FormManagementComponent,
    DashboardComponent,
    ReportStatsComponent,
    
    LoginComponent,
    RequestResetComponent,
    ResponseResetComponent,
    RegisterComponent,
    ProfileComponent,

    //Report filters
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
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,

    NzTableModule,
    NzPopoverModule,
    NzTabsModule,
    NzGridModule,
    NzSpinModule,
    NgxPaginationModule, 
    ChartsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NoticeSliderComponent,


    //reports
    ReportsListComponent, 
    AddReportComponent,
    ReportDetailsComponent,
    ReportInfoComponent,
    ReportStudentComponent,


    //insertions
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,

    //students
    ProfileEtudiantComponent,
    AddStudentComponent,
    StudentDetailsComponent,

    //professors
    AddProfessorComponent,
    ProfessorDetailsComponent,

    //Admin components
    FormManagementComponent,
    DashboardComponent,
    ReportStatsComponent,
    
    NzTableModule,
    NzPopoverModule,
    NzTabsModule,
    NzGridModule,
    NzSpinModule,

    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [
    ExportService,
    HttpClientModule,
    PromotionFilterDashboardPipe
       
  ]
})
export class SharedModule { }
