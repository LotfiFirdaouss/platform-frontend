import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'villeInsertionFilter'
})
export class VilleInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], ville: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!ville) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.ville.toLocaleLowerCase().includes(ville.toLocaleLowerCase());
    });
  }

}
