import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

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
   selectedStageProjet:'';
   selectedConfidentiel;
   selectedReportType:'';
   StartDateReport?: any;
   EndDateReport?: any;
   
   constructor(private reportService: ReportService,
    private token: TokenStorageService,
    private studentService : StudentService) { }
   
   ngOnInit(): void {
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
   
}