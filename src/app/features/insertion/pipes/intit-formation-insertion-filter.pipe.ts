import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'intitFormationInsertionFilter'
})
export class IntitFormationInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], formation: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!formation) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.intit_formation.toLocaleLowerCase().includes(formation.toLocaleLowerCase());
    });
  }

}
