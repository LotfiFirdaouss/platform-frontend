import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from 'src/app/features/administrator/services/export.service';
import { Professor } from 'src/app/features/professor/models/professor';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { Report } from '../../../report/models/report';
import { ReportService } from '../../../report/services/report.service';

@Component({
  selector: 'app-report-stats',
  templateUrl: './report-stats.component.html',
  styleUrls: ['./report-stats.component.css']
})
export class ReportStatsComponent implements OnInit {

  /* the table reference */
  @ViewChild('reportTable') reportTable: ElementRef;

  //list of reports
  reports?: Report[];

  //default required filters
  filterAnneeParDefaut=new Date().getFullYear();
  selectFiliereParDefaut="GI"; 

   //filter inputs
   filterText: '';
   filterPromotion:'';
   selectFiliere:'';
   selectedReportType:"";
   StudentfilterText:'';
   selectedConfidentiel;
   StartDateReport?: any;
   EndDateReport?: any;
   selectedStageProjet:'';
   VillePaysText:'';
   SocieteText:'';
   SecteurSocieteText:'';
   
  //For spinner
  hideSpinner = false;

  //for pagination
  p=1;

  professeurs?:Professor[];

  constructor(
    private reportService: ReportService,
    private exportService: ExportService,
    private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.retrieveReports();
    this.retrieveProfesseurs();
  }

  retrieveReports(): void {
    this.reportService.getAllReportValidatedAndFiltered(this.filterAnneeParDefaut,this.selectFiliereParDefaut) 
      .subscribe(
        data => {
          this.reports = data;
          console.log(data);
          //this.hideSpinner();
          this.hideSpinner = true;
        },
        error => {
          console.log(error);
        });
 }

 retrieveProfesseurs(){
   this.professorService.getAll()
    .subscribe(data => {
      this.professeurs = data;
    },
    error => {
      console.log(error);
    });
 }

  //exprt table  function  
  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.reportTable, 'reports_data');
  }

  renitialiserFiltres(){
    this.filterText= '';
    this.filterPromotion='';
    this.selectFiliere='';
    this.StudentfilterText='';
    this.selectedStageProjet='';
    this.selectedConfidentiel=false;
    this.selectedReportType='';
    this.StartDateReport=null;
    this.EndDateReport=null;
    this.VillePaysText='';
    this.SocieteText='';
    this.SecteurSocieteText='';
    //hide advanced search and stage filters
    var advancedSearch =<HTMLDivElement> document.getElementsByName("advancedSearch")[0];
    var arrowUp = <HTMLDivElement> document.getElementsByName("arrow-up")[0];
    var arrowDown = <HTMLDivElement> document.getElementsByName("arrow-down")[0];
    var StageFilters =<HTMLDivElement> document.getElementsByName("StageFilters")[0];

    if( advancedSearch.classList.contains("visible")){
      advancedSearch.classList.replace("visible","hidden");
      StageFilters.classList.replace("visible","hidden");
      arrowUp.classList.replace("visibleArrow","hidden");
      arrowDown.classList.replace("hidden","visibleArrow");
    }
  }

  ShowHideStageFilters(){
    //  console.log(this.selectedStageProjet)
    var StageFilters =<HTMLDivElement> document.getElementsByName("StageFilters")[0];
    // console.log(StageFilters)
    if( this.selectedStageProjet?.toString() == "stage"){
      StageFilters.classList.replace("hidden","visible");
    }else{
      StageFilters.classList.replace("visible","hidden");
    }
  }

  ShowHideAdvancedSearch(){
    var advancedSearch =<HTMLDivElement> document.getElementsByName("advancedSearch")[0];
    var StageFilters =<HTMLDivElement> document.getElementsByName("StageFilters")[0];
    var arrowUp = <HTMLDivElement> document.getElementsByName("arrow-up")[0];
    var arrowDown = <HTMLDivElement> document.getElementsByName("arrow-down")[0];
    if( advancedSearch.classList.contains("hidden")){
      advancedSearch.classList.replace("hidden","visible");
      arrowUp.classList.replace("hidden","visibleArrow");
      arrowDown.classList.replace("visibleArrow","hidden");
      if( this.selectedStageProjet?.toString() == "stage"){
        StageFilters.classList.replace("hidden","visible");
      }
    }else{
      advancedSearch.classList.replace("visible","hidden");
      StageFilters.classList.replace("visible","hidden");
      arrowUp.classList.replace("visibleArrow","hidden");
      arrowDown.classList.replace("hidden","visibleArrow");
    }
  }

  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  applyFilters(){
    this.retrieveReports();
  }

}
