import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReturnedUser } from './auth/models/returned-user';
import { TokenStorageService } from './auth/services/token-storage.service';

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

  constructor(
    private token: TokenStorageService,
    private router: Router
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
        }else if( url == "/login" || url == "/home"){
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
        }else if( url == "/profile"){
          id = "profileId";
        }else if( url == "/rapport/ajouter" || url.includes("/rapport/etudiant") || url.includes("/rapport/info/")){
          id = "rapportsId";
        }else if( url == "/insertion"){
          id = "insertionsId";
        }else if( url == "/insertion/ajouter" || url.includes("/insertion/etudiant/") || url.includes("/insertion/info/")){
          id = "insertionId";
        }else if( url == "/professeur" || url == "/professeur/ajouter"){
          id = "gestionProfId";
        }else if( url == "/etudiant" || url == "/etudiant/ajouter"){
          id = "gestionEtudId";
        }else if( url == "/admin/gestionForm"){
          id = "formId";
        }else if( url == "/rapport/stats"){
          id = "statsId";
        }
        //console.log("logged in id:",id)
        activeLink = <HTMLLIElement> document.getElementsByClassName("active")[0];
        activeLink.classList.remove("active");
        currentLink = document.getElementById(id);
        currentLink.parentElement.classList.add("active")
      }

    }   

}
