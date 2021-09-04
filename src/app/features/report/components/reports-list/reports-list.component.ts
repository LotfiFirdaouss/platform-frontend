import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
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
   isStudent=0;

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
   
   constructor(private reportService: ReportService,
    private token: TokenStorageService,
    private studentService : StudentService) { }
   
   ngOnInit(): void {
    //this.showSpinner();
    this.retrieveReports();
    this.isLoggedIn = !!this.token.getToken();    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      //console.log("User object:",this.currentUser)
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
        
      }else if( this.group == "Student" ){
        this.getStudent(user_id);
      }
    }
   }

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
          this.isStudent=data[0].id;
          //console.log("Student object:", data[0])
        },
        error => {
          console.log(error);
        });
  }
   
  retrieveReports(): void {
     this.reportService.getAll()
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


  // printFiles(filiere,promotion){
  //   console.log("print function!!")
  //   this.reportService.printReportsFile(filiere,promotion);
  // }

  printFiles(){
    
  }
   
}