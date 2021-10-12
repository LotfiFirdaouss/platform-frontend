import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/features/professor/models/professor';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { ReturnedUser } from '../../models/returned-user';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile-modify-professor',
  templateUrl: './profile-modify-professor.component.html',
  styleUrls: ['./profile-modify-professor.component.css']
})
export class ProfileModifyProfessorComponent implements OnInit {
  currentUser!: ReturnedUser;
  isLoggedIn = false;
  group="";
  currentProfessor!: Professor;

  //for the form
  departements=['GI','GM','GE'];  

  form = {
    departement:"",
    telephone:"",
    email_perso:""
  }

  constructor(private token: TokenStorageService,
    private professorService : ProfessorService,
    private router: Router) { }

  ngOnInit(): void {    
    this.isLoggedIn = !!this.token.getToken();    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      this.group = this.currentUser.groups[0];
      console.log("I am user",user_id)
      this.getProfessor(user_id);
    }
  }

  getProfessor(id_user: number): void {
    this.professorService.findByUser(id_user)
      .subscribe(
        data => {
          console.log("Professor object:", data)
          this.currentProfessor = <Professor>data;
          console.log("dep",this.currentProfessor.departement)
          this.form.email_perso = this.currentProfessor.email_perso;
          this.form.departement = <string>this.currentProfessor.departement;
          this.form.telephone = <string>this.currentProfessor.telephone;
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
      email_pro:this.currentProfessor.email_pro,
      email_perso:this.form.email_perso,
      telephone:this.form.telephone,
      departement:this.form.departement,
      fk_user:this.currentUser.id,
    };
    this.professorService.update(this.currentProfessor.id, data)
     .subscribe(
       response => {
         console.log("modified professor",response)
         this.router.navigate(['/profile']);
       },
       error => {
         console.log(error);
      });
  }

}
