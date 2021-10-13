import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { ReturnedUser } from '../../models/returned-user';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile-modify',
  templateUrl: './profile-modify.component.html',
  styleUrls: ['./profile-modify.component.css']
})
export class ProfileModifyComponent implements OnInit {
  currentUser!: ReturnedUser;
  isLoggedIn = false;
  group="";
  currentStudent!: Student;

  //for the form
  filieres=['GI','GM','GEM','MSEI','IAGI'];  

  form = {
    code_etudiant:"",
    filiere:"",
    promotion:"",
    telephone:"",
    email_perso:""
  }
  
  constructor(private token: TokenStorageService,
    private studentService : StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      this.group = this.currentUser.groups[0];
      this.getStudent(user_id);
    }
  }  

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
          this.form.code_etudiant = <string>this.currentStudent.code_etudiant;
          this.form.email_perso = this.currentStudent.email_perso;
          this.form.filiere = <string>this.currentStudent.filiere;
          this.form.promotion = <string>this.currentStudent.promotion;
          this.form.telephone = this.currentStudent.telephone;

          console.log("Student object:", data[0])
        },
        error => {
          console.log(error);
        });
  }

  public ValidityWarn(){
    console.log("warn")
    var submitBtn= <HTMLInputElement> document.getElementById("submitBtn");
    var ValidityFormWarn= <HTMLInputElement> document.getElementById("ValidityFormWarn");
    if( submitBtn.disabled == true ){
      console.log("heere")
      ValidityFormWarn.style.display="block";
    }else{
      ValidityFormWarn.style.display="none";
    }
  }

  onSubmit(): void {
    const data = {
      code_etudiant:this.form.code_etudiant,
      email_perso:this.form.email_perso,
      telephone:this.form.telephone,
      filiere:this.form.filiere,
      promotion:this.form.promotion,
      fk_user:this.currentUser.id,
    };
    this.studentService.update(this.currentStudent.id, data)
     .subscribe(
       response => {
         console.log("modified student",response)
         this.router.navigate(['/profile']);
       },
       error => {
         console.log(error);
      });
  }


}


