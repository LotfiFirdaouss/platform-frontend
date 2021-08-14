import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';


@Component({
  selector: 'app-add-insertion',
  templateUrl: './add-insertion.component.html',
  styleUrls: ['./add-insertion.component.css']
})
export class AddInsertionComponent implements OnInit {
  insertion : Insertion = {
    cursus_post_ensam: 'travail',
    univ : '',
    pays : '',    
    nature_formation : '',
    intit_formation : '',
    intit_poste : '',
    societe : '',
    ville : '',
    date_integration: null, //YYYY-MM-DD
    fk_etudiant : 0,
  }
  submitted = false;
  clicked=false;
  etudeDisabled=true;
  travailDisabled=false;

  constructor(private insertionService : InsertionService) { }

  ngOnInit(): void {
    
  }

  saveInsertion(): void {
    const data = {
      cursus_post_ensam: this.insertion.cursus_post_ensam,
      univ : this.insertion.univ,
      pays : this.insertion.pays,
      nature_formation : this.insertion.nature_formation,
      intit_formation : this.insertion.intit_formation,
      intit_poste : this.insertion.intit_poste,
      societe : this.insertion.societe,
      ville : this.insertion.ville,
      date_integration: this.insertion.date_integration,
      fk_etudiant : this.insertion.fk_etudiant
    };

    this.insertionService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newInsertion(): void {
    this.submitted = false;
    this.insertion = {
      cursus_post_ensam: 'travail',
      univ : '',
      pays : '',    
      nature_formation : '',
      intit_formation : '',
      intit_poste : '',
      societe : '',
      ville : '',
      date_integration: null, 
      fk_etudiant : 0,
    };
  }

  myFunction(){
    this.onCursus();
    var cursus= <HTMLInputElement> document.getElementById("cursus_post_ensam");
    var cursus_value=cursus.value;
    if(cursus_value=="travail"){
      this.etudeDisabled=true;
      this.travailDisabled=false;
    }else{
      this.etudeDisabled=false;
      this.travailDisabled=true;
    }
  }

  onCursus(){
    //recuperer la valeur de cursus
    var cursus= <HTMLInputElement> document.getElementById("cursus_post_ensam");
    var cursus_value=cursus.value;

    var index,elements,count,Element;
    //renitialiser les valeurs
    if(cursus_value=="travail"){
      elements = document.getElementsByClassName('etudeClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
      }
  }else{
      elements = document.getElementsByClassName('travailClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
      }
    }
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
