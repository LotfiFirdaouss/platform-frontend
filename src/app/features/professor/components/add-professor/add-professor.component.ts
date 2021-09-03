import { Component, OnInit } from '@angular/core';
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent implements OnInit {

  professor: Professor = {
    nom_prenom:'',
    nom:'',
    prenom:'',
    email_perso:'',
    email_pro:'',
    telephone:'',
    departement:'Choisissez votre departement*',
    fk_user:null, 
  };
  submitted = false;
  departements=['Choisissez votre departement*','GI','GM','GE'];

  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {
  }

  saveProfessor(): void {
    const data = {
      nom_prenom:this.professor.nom.concat(" ",this.professor.prenom.toString()),
      nom:this.professor.nom,
      prenom:this.professor.prenom,
      email_perso:this.professor.email_perso,
      email_pro:this.professor.email_pro,
      telephone:this.professor.telephone,
      filiere:this.professor.departement,
      fk_user:this.professor.fk_user,
    };

    this.professorService.create(data)
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
