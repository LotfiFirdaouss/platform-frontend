import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  myDropdownRapport= "myDropdownRapport";
  myDropdownInsertion="myDropdownInsertion";
  myDropdownProf="myDropdownProf";
  myDropdownEtudiant="myDropdownEtudiant";
  myDropdownStats="myDropdownStats";

  isLoggedIn = false;
  currentUser!: ReturnedUser;
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;

  //used only if the current user is a student
  currentStudent!: Student; 
  hasInsertion=false;

  currentRoute: string;

  constructor(private token: TokenStorageService,
    private studentService: StudentService,
    private insertionService: InsertionService,
    private location: Location) {
      
      }

  ngOnInit() {  
    this.loadJsFile("../../../../assets/js/menu.js"); 
    this.isLoggedIn = !!this.token.getToken();
    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
      }else if( this.group == "Professor" ){
        this.isProfessor = true;
      }else{
        this.isStudent = true;
        this.getStudent(user_id);
      }
    }

    //activating appopriate btn depending on currentRoute
    this.currentRoute = this.location.path();
    console.log(this.currentRoute)
    if( this.currentRoute == "/home" ){
      this.menuActiveLinkFuncFromRoute("homeId");
    }else if(this.currentRoute == "/profile"){
      this.menuActiveLinkFuncFromRoute("profileId");
    }else if(this.currentRoute == "/rapport/ajouter" || this.currentRoute.includes("/rapport/etudiant/")){
      this.menuActiveLinkFuncFromRoute("rapportsId");
    }else if(this.currentRoute == "/insertion"){
      this.menuActiveLinkFuncFromRoute("insertionsId");
    }else if(this.currentRoute == "/insertion/ajouter" || this.currentRoute.includes("/insertion/etudiant/")){
      this.menuActiveLinkFuncFromRoute("insertionId");
    }else if(this.currentRoute == "/professeur" || this.currentRoute == "/professeur/ajouter"){
      this.menuActiveLinkFuncFromRoute("gestionProfId");
    }else if(this.currentRoute == "/etudiant" || this.currentRoute == "/etudiant/ajouter"){
      this.menuActiveLinkFuncFromRoute("gestionEtudId");
    }else if(this.currentRoute == "/gestionForm"){
      this.menuActiveLinkFuncFromRoute("formId");
    }else if(this.currentRoute == "/rapport/stats" || this.currentRoute == "/rapport/dashboard"){
      this.menuActiveLinkFuncFromRoute("statsId");
    }
    
  }  

  getInsertion(id_etudiant: number): void {
    this.insertionService.findByStudent(id_etudiant)
      .subscribe(
        data => {
          this.hasInsertion=true;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getStudent(id_user: number): void {
    //console.log("3.get student function =========")
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          //console.log("inside func")
          this.currentStudent = data[0];
          //console.log(data);
        },
        error => {
          console.log(error);
        });
    //console.log("after subscribe: ",this.currentStudent);    
  }

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  public dropDownFunction(id) {
    document.getElementById(id).classList.toggle("show");
  }

  public menuActiveLinkFunc(event){
    var activeLinks = document.getElementsByClassName("active");
    //console.log("old active links",activeLinks[0])
    activeLinks[0].classList.remove("active")
  
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var ParentLiElement = <HTMLLIElement> document.getElementById(value).parentElement;
    ParentLiElement.classList.add("active");
  }

  public menuActiveLinkFuncFromRoute(aId){
    // console.log("calling active func")
    //removing active from default active link
    var activeHomeLink = <HTMLLIElement> document.getElementById("homeId").parentElement;
    activeHomeLink.classList.remove("active");

    //adding acting into cuurent active page depending on current URL
    var link = document.getElementById(aId);
    link.parentElement.classList.add("active")
  }

}
