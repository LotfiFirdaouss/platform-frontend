import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReturnedUser } from './auth/models/returned-user';
import { TokenStorageService } from './auth/services/token-storage.service';
import { Report } from './features/report/models/report';
import { ReportService } from './features/report/services/report.service';
import { Student } from './features/student/models/student';
import { StudentService } from './features/student/services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  title = 'platform-frontend';

  isLoggedIn = false;
  currentUser!: ReturnedUser; 
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;
  currentStudent!:Student;
  currentReport!:Report;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private studentService : StudentService,
    private reportService : ReportService,
    ) { 
      router.events.subscribe((val) => {
        // see also 
        if(val instanceof NavigationEnd){
          //console.log("new value of URL",val.url) 
          this.activeLinkFuncFromRoute(val.url);
        }
    });
    }

    ngOnInit(): void {
      this.isLoggedIn = !!this.token.getToken();
    
      if (this.isLoggedIn) {
        this.currentUser = this.token.getUser();
        this.group = this.currentUser.groups[0];
        if( this.group == "Administrator"){
          this.isAdministrator = true;
        }else if( this.group == "Professor" ){
          this.isProfessor = true;
        }else{
          this.isStudent = true;
        }
      } 
      
    } 
    
    activeLinkFuncFromRoute(url){
      var id,activeLink,currentLink;
      if (!this.isLoggedIn) {
        if( url == "/" ){
          id = "accueilBtnID";
        }else if( url == "/%C3%A0-propos"){
          id = "AproposBtnID";
        }else if( url == "/contact"){
          id = "contactBtnID";
        }else if( url == "/register"){
          id = "signupBtnID";
        }else if( url == "/login"){
          id = "signinBtnID";
        }else if( url == "/request-reset-password"){
          id = "signinBtnID";
        }else if( url.includes("/response-reset-password")){
          id = "signinBtnID";
        }
        //console.log("not logged in id:",id)
        activeLink = <HTMLElement> document.getElementsByClassName("Hactive")[0];
        activeLink.classList.replace("Hactive","inactive")
        currentLink = document.getElementById(id);
        currentLink.classList.replace("inactive","Hactive")
      }
      else
      {
        if(  url == "/rapport" || url == "/login"){
          id = "homeId";
        }else if( url.includes("/profile-etudiant")){
          this.getStudentUser(this.currentUser.id, url);
        }else if( url == "/profile"){
          id = "profileId";
        }else if( url == "/admin/gestionForm"){
          id = "formId";
        }else if( url == "/admin/stats" ){
          id = "statsId";
        }else if( url == "/admin/dashboard" ){
          id = "dashId";
        }else if( url.includes("/rapport/info") || url.includes("/rapport/etudiant") ){
          this.getStudent(this.currentUser.id, url);
          // id = "rapportsId";  OR  id = "homeId"; depending on the user viewing it
          // are they the owner student or not?
        }else if( url.includes("/rapport/")){
          id = "rapportsId";
        }else if( url == "/insertion"){
          id = "insertionsId";
        }else if( url.includes("/insertion/")){
          this.isAdministrator ? id = "insertionsId" : id = "insertionId";
        }else if( url == "/professeur" || url == "/professeur/ajouter"){
          id = "gestionProfId";
        }else if( url == "/etudiant" || url == "/etudiant/ajouter"){
          id = "gestionEtudId";
        }
        //console.log("logged in id:",id)
        if( !url.includes("/rapport/info") && !url.includes("/rapport/etudiant") && !url.includes("/profile-etudiant")){
        activeLink = <HTMLLIElement> document.getElementsByClassName("active")[0];
        activeLink.classList.remove("active");
        currentLink = document.getElementById(id);
        currentLink.parentElement.classList.add("active")
        }
      }

      

    }   

    getStudent(id_user: number,url): void {
      this.studentService.findByUser(id_user)
        .subscribe(
          data => {
            this.currentStudent = data[0];
            // console.log("stuuudent=================")
            // console.log(this.currentStudent)
            // console.log("==========================")
            var id,activeLink,currentLink;
            if(url.includes("/rapport/etudiant")){
              if(url == "/rapport/etudiant/".concat(this.currentStudent.id.toString())){
                id = "rapportsId";
                console.log("isStudentOwner")
              }
              else{
                id = "homeId";
                console.log("llll")
              }
              console.log(id)
              activeLink = <HTMLLIElement> document.getElementsByClassName("active")[0];
              activeLink.classList.remove("active");
              currentLink = document.getElementById(id);
              currentLink.parentElement.classList.add("active");

            }else if(url.includes("/rapport/info")){
              var reportId = <number>url.split("/")[3];
              console.log("hhhere")
              this.reportService.get(reportId).subscribe(
                data => {
                  console.log("found")
                  this.currentReport = data;
                  if(this.currentReport.fk_etudiant.id==this.currentStudent.id ){
                    id = "rapportsId";
                    console.log("isReportOwner")
                  }else{
                    id = "homeId";
                  }
                  console.log(id)
                  activeLink = <HTMLLIElement> document.getElementsByClassName("active")[0];
                  activeLink.classList.remove("active");
                  currentLink = document.getElementById(id);
                  currentLink.parentElement.classList.add("active");

                },
                error => {
                  console.log(error);
                });

            }

          },
          error => {
            console.log(error);
          });
          
    }
    
    getStudentUser(id_user: number,url): void {
      this.studentService.findByUser(id_user)
        .subscribe(
          data => {
            this.currentStudent = data[0];

            var id,activeLink,currentLink;
            console.log(this.currentStudent.id)
            if(url == "/profile-etudiant/".concat(this.currentStudent.id.toString())){
              id = "profileId";
              // console.log("isStudentOwner")
              this.router.navigate(['/profile']);
            }
            else{
              id = "homeId";
              // console.log("llll")
            }
            console.log(id)
            activeLink = <HTMLLIElement> document.getElementsByClassName("active")[0];
            activeLink.classList.remove("active");
            currentLink = document.getElementById(id);
            currentLink.parentElement.classList.add("active");

          },
          error => {
            console.log(error);
          });
          
    }

}
