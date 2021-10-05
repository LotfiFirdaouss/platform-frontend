import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  students?: Student[];
  edit: { [key: string]: { edit: boolean }} = {}; 
  currentStudent?: Student;
  currentIndex = -1;
  filieres=['GI','GM','GEM','MSEI','IAGI'];
  filieresOfFilter=['GI','GM','GEM','GE(ancienne)','MSEI','IAGI'];

  //filter inputs
  filterNom: '';
  filterPromotion:'';
  selectFiliere:'';

  //for pagination
  p: number = 1;

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    this.retrieveStudents();
  }

  retrieveStudents(): void {
    this.studentService.getAll()
      .subscribe(
        data => {
          this.students = data;
          this.students.forEach(item => {
            this.edit[item.id]= {
              edit: false
            };
          });
        },
        error => {
          //console.log(error);
        });
  }
  
  setActiveStudent(student: Student, index: number): void {
    this.currentStudent = student;
    this.currentIndex = index;
  }

  renitialiserFiltres(){
    this.filterNom= '';
    this.filterPromotion='';
    this.selectFiliere='';
  }

  startEditStudent(id:number): void {
    this.edit[id].edit = true;
    console.log(this.edit[id].edit);
  }

  cancelEditStudent(): void {    
    this.retrieveStudents();
  }

  saveEditStudent(id: string): void {
    
    const index = this.students.findIndex(item => item.id === id);
    var idUser:number;
    if(this.students[index].fk_user==null){
      idUser=null;
    }
    else{
      idUser=this.students[index].fk_user.id;
    }
    const data = {
      code_etudiant:this.students[index].code_etudiant,
      nom_prenom:this.students[index].nom.concat(" ",this.students[index].prenom.toString()),
      nom:this.students[index].nom,
      prenom:this.students[index].prenom,
      email_perso:this.students[index].email_perso,
      email_pro:this.students[index].email_pro,
      telephone:this.students[index].telephone,
      filiere:this.students[index].filiere,
      promotion:this.students[index].promotion,
      fk_user:idUser,
    };
    this.studentService.update(this.students[index].id, data)
     .subscribe(
       response => {
         this.retrieveStudents();
       },
       error => {
         console.log(error);
      });
  }

}
