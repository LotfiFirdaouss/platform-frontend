import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'nomStudentFilter'
})
export class NomStudentFilterPipe implements PipeTransform {

  transform(students: Student[], nom: string): Student[] {
    if (!students) {
      return [];
    }
    if (!nom) {
      return students;
    }

    return students.filter( student => { 
      return this.studentOfNom(student, nom);
    });
  }

  private studentOfNom(student : Student, nom){
    return student.prenom.toLocaleLowerCase().includes(nom.toLocaleLowerCase())
    || student.nom.toLocaleLowerCase().includes(nom.toLocaleLowerCase());
  }

}
