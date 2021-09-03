import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'etudiantFilter'
})
export class EtudiantFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], student: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!student) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.fk_etudiant.prenom.toLocaleLowerCase().includes(student.toLocaleLowerCase())
      || insertion.fk_etudiant.nom.toLocaleLowerCase().includes(student.toLocaleLowerCase());
    });
  }

}
