import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from '../../models/returned-user';
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from "@angular/router"
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { Professor } from 'src/app/features/professor/models/professor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser!: ReturnedUser;
  isLoggedIn = false;
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;
  //used only if the current user is a student
  currentStudent!: Student;
  currentProfessor!: Professor;

  constructor(private token: TokenStorageService,
    private studentService : StudentService,
    private professorService : ProfessorService,
) { }

  ngOnInit(): void {
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
        this.getProfessor(user_id);
      }else{
        this.isStudent = true;
        this.getStudent(user_id);
      }
    }
  }

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
        },
        error => {
          console.log(error);
        });
  }

  getProfessor(id_user: number): void {
    this.professorService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentProfessor = <Professor> data;
        },
        error => {
          console.log(error);
        });
  }

}
