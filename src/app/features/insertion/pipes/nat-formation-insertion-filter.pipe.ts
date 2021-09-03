import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'natFormationInsertionFilter'
})
export class NatFormationInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], formation: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!formation) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.nature_formation.toLocaleLowerCase().includes(formation.toLocaleLowerCase());
    });
  }

}
