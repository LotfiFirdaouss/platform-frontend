import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'filiereStudentFilter'
})
export class FiliereStudentFilterPipe implements PipeTransform {

  transform(students: Student[], filiere: string): Student[] {
    if (!students) {
      return [];
    }
    if (!filiere) {
      return students;
    }

    return students.filter( student => { 
      return filiere==student.filiere;
    });
  }

}
