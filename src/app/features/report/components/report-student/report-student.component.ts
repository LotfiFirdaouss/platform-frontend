import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

   //currentStudent !: Student;
   isLoggedIn=false;
   
   constructor(private reportService: ReportService,
    private route: ActivatedRoute,
    private studentService: StudentService) { }
   
   ngOnInit(): void {
     var student_id=this.route.snapshot.params.etudiant;
     this.getReport(student_id);
     //this.getStudent(student_id);
   }

  //  getStudent(id_etudiant: number): void {
  //   this.studentService.get(id_etudiant)
  //     .subscribe(
  //       data => {
  //         this.currentStudent = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }  
   
   getReport(id: string): void {
     this.reportService.findByStudent(id)
       .subscribe(
         data => {
           this.reports = data;
           console.log(data);
         },
         error => {
           console.log(error);
         });
   }
   
   setActiveReport(report: Report, index: number): void {
     this.currentReport = report;
     this.currentIndex = index;
   }
   
}