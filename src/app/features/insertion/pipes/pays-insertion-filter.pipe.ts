import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'paysInsertionFilter'
})
export class PaysInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], pays: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!pays) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.pays.toLocaleLowerCase().includes(pays.toLocaleLowerCase());
    });
  }

}
