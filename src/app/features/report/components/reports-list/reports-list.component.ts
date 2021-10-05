import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Professor } from 'src/app/features/professor/models/professor';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';
//import {NgxPaginationModule} from 'ngx-pagination'; 

@Component({
   selector: 'app-reports-list',
   templateUrl: './reports-list.component.html',
   styleUrls: ['./reports-list.component.css']
  })
export class ReportsListComponent implements OnInit {
  
   reports?: Report[];
   currentReport?: Report;
   currentIndex = -1;
   isLoggedIn = false;
   group="";
   isAdministrator=false; 
   currentUser: ReturnedUser;
   currentStudent: Student;
   currentProfessor: Professor;
   isStudent=0;

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

   //for pagination
   p: number = 1;

   //For spinner
   hideSpinner = false;

   years=[];
   
   
   constructor(private reportService: ReportService,
    private token: TokenStorageService,
    private studentService : StudentService,
    private professorService : ProfessorService) { }
   
   ngOnInit(): void {
    //this.showSpinner();
    this.fillYears();
    
    this.isLoggedIn = !!this.token.getToken();    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      //console.log("User object:",this.currentUser)
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
        this.retrieveReports();

        
      }else if( this.group == "Student" ){
        this.getStudent(user_id) //retreive reports gets called inside the subscribe
      }else if(this.group == "Professor"){
        this.getProfessor(user_id);

      }
    }

   }

   fillYears(){
     let year=2019;
     let range = this.filterAnneeParDefaut - year + 2;
     for(var counter:number = 1; counter<range; counter++){
        this.years.push(year);
        year++;
    }
    this.years.push("Tout")
  }

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
          this.isStudent=data[0].id;
          this.selectFiliereParDefaut = this.currentStudent.filiere.toString();
          this.retrieveReports();
        },
        error => {
          console.log(error);
        });
  }
  
  getProfessor(id_user: number): void {
    this.professorService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentProfessor = <Professor>data;
          console.log(this.currentProfessor)
          this.selectFiliereParDefaut = this.currentProfessor.departement.toString();
          this.retrieveReports();
        },
        error => {
          console.log(error);
        });
  }
   
  retrieveReports(): void {
    //(report.valid_admin && report.type_rapport!='PFE')  OR
    //(report.type_rapport=='PFE' && report.valid_admin && report.valid_encadrant)
     this.reportService.getAllReportValidatedAndFiltered(this.filterAnneeParDefaut,this.selectFiliereParDefaut)
       .subscribe(
         data => {
           this.reports = data;
           console.log(data)
           //console.log(data);
           //this.hideSpinner();
           //data.forEach(report=>{ this.getMots(report); })     
           this.hideSpinner = true;
         },
         error => {
           //console.log(error);
         });
  }
   
  refreshList(): void {
     this.retrieveReports();
     this.currentReport = undefined;
     this.currentIndex = -1;
  }
   
  setActiveReport(report: Report, index: number): void {
     this.currentReport = report;
     this.currentIndex = index;
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

  //capitalize only the first letter of the string. 
  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ApplyFilters(){
    this.retrieveReports();
  }
   

  /*public getMots(report:Report){
    this.allmots[report.id]={mots:[]};
    for(const index in report.mots){
      this.reportService.getMot(report.mots[index]).subscribe(
        data => {this.allmots[report.id].mots.push(data.mot as string); console.log(this.allmots[report.id].mots); }
      );
    }
    
  }*/
}