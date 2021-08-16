import { Component, OnInit } from '@angular/core';
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
    private token: TokenStorageService) { }

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
}
