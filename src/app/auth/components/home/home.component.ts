import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from '../../models/returned-user';
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser!: ReturnedUser;
  isLoggedIn = false;
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;

  constructor(private token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser.id){
      this.isLoggedIn = true;
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
      }else if( this.group == "Professor" ){
        this.isProfessor = true;
      }else{
        this.isStudent = true;
      }
    }  
    if(this.isLoggedIn == false){
      this.router.navigate(['/'])
    }
  }

}
