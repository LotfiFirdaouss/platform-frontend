import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
   selector: 'app-report-student',
   templateUrl: './report-student.component.html',
   styleUrls: ['./report-student.component.css']
  })
export class ReportStudentComponent implements OnInit {
  
   reports?: Report[];
   currentReport?: Report;
   currentIndex = -1;

   isLoggedIn=false;
   currentUser!: ReturnedUser;
   user_id: number;
   
   currentStudent !: Student;
   isStudentOwner=false; 

    //For spinner
    hideSpinner = false;
   
   constructor(private reportService: ReportService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private token : TokenStorageService) { }
   
   ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();    
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.user_id = this.currentUser.id;
      //console.log("current User id:",this.user_id)
    }  
     var student_id;
     this.route.params.subscribe(
      params => {
        student_id=this.route.snapshot.params.etudiant;
        this.getReport(student_id);
        this.getStudent(student_id);
      }
    );
     
   }

   getStudent(id_etudiant: number): void {
    this.studentService.get(id_etudiant)
      .subscribe(
        data => {
          this.currentStudent = data;
          //console.log("Reports' student user id:",data.fk_user.id);
          if(data.fk_user?.id == this.user_id){
            this.isStudentOwner=true;
          }
          //console.log("reports owner:",this.isStudentOwner)
        },
        error => {
          console.log(error);
        });
  }  
   
   getReport(id: string): void {
     this.reportService.findByStudent(id)
       .subscribe(
         data => {
           this.reports = data;
           console.log(data);
           this.hideSpinner = true;
         },
         error => {
           console.log(error);
         });
   }
   
   setActiveReport(report: Report, index: number): void {
     this.currentReport = report;
     this.currentIndex = index;
   }

     //capitalize only the first letter of the string. 
  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   
}