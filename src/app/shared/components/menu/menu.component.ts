import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

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

  isLoggedIn = false;
  currentUser!: ReturnedUser; 
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {  
    this.loadJsFile("../../../../assets/js/menu.js");  
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

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  public dropDownFunction(id) {
    document.getElementById(id).classList.toggle("show");
  }

}
