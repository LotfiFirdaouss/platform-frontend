import { Component, OnInit } from '@angular/core';
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-details',
  templateUrl: './professor-details.component.html',
  styleUrls: ['./professor-details.component.css']
})
export class ProfessorDetailsComponent implements OnInit {

  professors?: Professor[];
  edit: { [key: string]: { edit: boolean }} = {}; 
  currentProfessor?: Professor;
  currentIndex = -1;
  departements=['GI','GM','GE'];
  departementsOfFilter=['GI','GM','GE'];

  //filter inputs
  filterNom: '';
  selectDepartement:'';

  //for pagination
  p: number = 1;

  constructor(private professorService : ProfessorService) { }

  ngOnInit(): void {
    this.retrieveProfessor();
  }

  retrieveProfessor(): void {
    this.professorService.getAll()
      .subscribe(
        data => {
          this.professors = data;
          this.professors.forEach(item => {
            this.edit[item.id]= {
              edit: false
            };
          });
        },
        error => {
          console.log(error);
        });
  }
  
  setActiveProfessor(professor: Professor, index: number): void {
    this.currentProfessor = professor;
    this.currentIndex = index;
  }

  renitialiserFiltres(){
    this.filterNom= '';
    this.selectDepartement='';
  }

  deleteProfessor(id:number): void {
    const index = this.professors.findIndex(item => item.id === id);
    var idUser:number;
    if(this.professors[index].fk_user==null){
      this.professorService.delete(id).subscribe(
       response => {
         this.retrieveProfessor();
       });
    }
    else{
      idUser=this.professors[index].fk_user;
      this.professorService.deleteUser(idUser).subscribe(
        response => {
          this.retrieveProfessor();
        });
    }    
  }

  startEditProfessor(id:number): void {
    this.edit[id].edit = true;
  }

  cancelEditProfessor(): void {    
    this.retrieveProfessor();
  }

  saveEditProfessor(id: string): void {
    
    const index = this.professors.findIndex(item => item.id === id);
    var idUser:number;
    if(this.professors[index].fk_user==null){
      idUser=null;
    }
    else{
      idUser=this.professors[index].fk_user.id;
    }
    const data = {
      nom_prenom:this.professors[index].nom.concat(" ",this.professors[index].prenom.toString()),
      nom:this.professors[index].nom,
      prenom:this.professors[index].prenom,
      email_perso:this.professors[index].email_perso,
      email_pro:this.professors[index].email_pro,
      telephone:this.professors[index].telephone,
      departement:this.professors[index].departement,
      fk_user:idUser,
    };
    this.professorService.update(this.professors[index].id, data)
     .subscribe(
       response => {
         this.retrieveProfessor();
       },
       error => {
         console.log(error);
      });
  }

}
