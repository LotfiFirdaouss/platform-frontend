import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-profile-etudiant',
  templateUrl: './profile-etudiant.component.html',
  styleUrls: ['./profile-etudiant.component.css']
})
export class ProfileEtudiantComponent implements OnInit {
  currentStudent : Student;
  isUser = false;

  //to get currentUser
  isLoggedIn = false;
  group="";
  isAdministrator=false;
  currentUser: ReturnedUser;
  
  constructor( private studentService : StudentService,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      //console.log("User object:",this.currentUser)
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
        
      }
    }
    var student_id = this.route.snapshot.params.id;
    this.getStudent(student_id);
    //console.log(this.currentStudent);
    
  }

  getStudent(id: String): void {
    this.studentService.get(id)
      .subscribe(
        data => {
          console.log(data)
          this.currentStudent = data;
          if(data.fk_user != null){
            this.isUser=true;
          }
          //console.log(this.isUser)
        },
        error => {
          console.log(error);
        });
  }

}
