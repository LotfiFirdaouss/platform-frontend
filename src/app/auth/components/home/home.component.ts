import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from '../../models/returned-user';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser!: ReturnedUser;
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.id)
    if(this.currentUser.id){
      this.group = this.currentUser.groups[0];
      console.log(this.group);
      if( this.group == "administator"){
        this.isAdministrator = true;
      }else if( this.group == "professor" ){
        this.isProfessor = true;
      }else{
        this.isStudent = true;
      }
    }  
  }

}
