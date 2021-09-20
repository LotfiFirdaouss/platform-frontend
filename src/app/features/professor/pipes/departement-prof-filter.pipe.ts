import { Pipe, PipeTransform } from '@angular/core';
import { Professor } from '../models/professor';

@Pipe({
  name: 'departementProfFilter'
})
export class DepartementProfFilterPipe implements PipeTransform {

  transform(professors: Professor[], departement: string): Professor[] {
    if (!professors) {
      return [];
    }
    if (!departement) {
      return professors;
    }

    return professors.filter( professor => { 
      return departement==professor.departement;
    });
  }

}
