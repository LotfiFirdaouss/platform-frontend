import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student: Student = {
    code_etudiant:null,
    nom_prenom:'',
    nom:'',
    prenom:'',
    email_perso:'',
    email_pro:'',
    telephone:'',
    filiere:'Choisissez votre filière*',
    promotion:'',
    fk_user:null, 
  };
  submitted = false;
  filieres=['Choisissez votre filière*','GI','GM','GEM','MSEI','IAGI'];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  saveStudent(): void {
    const data = {
      code_etudiant:this.student.code_etudiant,
      nom_prenom:this.student.nom.concat(" ",this.student.prenom.toString()),
      nom:this.student.nom,
      prenom:this.student.prenom,
      email_perso:this.student.email_perso,
      email_pro:this.student.email_pro,
      telephone:this.student.telephone,
      filiere:this.student.filiere,
      promotion:this.student.promotion,
      fk_user:this.student.fk_user,
    };

    this.studentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  ValidityWarn(){
    var submitBtn= <HTMLInputElement> document.getElementById("submitBtn");
    var ValidityFormWarn= <HTMLInputElement> document.getElementById("ValidityFormWarn");
    if( submitBtn.disabled == true ){
      ValidityFormWarn.style.display="block";
  }else{
      ValidityFormWarn.style.display="none";
  }
  }

}
