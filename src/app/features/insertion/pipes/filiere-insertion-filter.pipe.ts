import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'filiereInsertionFilter'
})
export class FiliereInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], filiere: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!filiere) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return filiere==insertion.fk_etudiant.filiere;
    });
  }

}
