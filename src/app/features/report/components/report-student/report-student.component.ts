import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

import jspdf from 'jspdf';    

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
   
   //attestation
   @ViewChild('myDiv',{static: false}) el!: ElementRef;
   attestation=false;
   date=new Date();

   currentStudent !: Student;
   isStudentOwner=false; 
   group:null;
   isAdministrator=false;
   isProfessor=false;
   isStudent=false;

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
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
      }else if( this.group == "Professor" ){
        this.isProfessor = true;
      }else{
        this.isStudent = true;
      }
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
           //console.log(data);
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
    if(string!=null){
      string = string.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  getCertificate(){
    if(this.attestation==true){
      this.attestation=false;
    }
    else {
      this.attestation=true;
    }    
  }

  pdf() {
    //var data = document.getElementById('myDiv'); 
    //data.style.display = 'block';
    let pdf = new jspdf('p','pt', [794, 1160]);
    pdf.html(this.el.nativeElement,{callback : (pdf) => {pdf.save('attestation_décharges.pdf')}});
    /*html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });*/
    //data.style.display = 'none';
  }
  
   
}