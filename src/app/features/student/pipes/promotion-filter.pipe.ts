import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'promotionStudentFilter'
})
export class PromotionStudentFilterPipe implements PipeTransform {

  transform(students: Student[], promotion: string): Student[] {
    if (!students) {
      return [];
    }
    if (!promotion) {
      return students;
    }

    return students.filter( student => { 
      return student.promotion == promotion;
    });
  }

}
