import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'posteInsertionFilter'
})
export class PosteInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], poste: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!poste) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.intit_poste.toLocaleLowerCase().includes(poste.toLocaleLowerCase());
    });
  }

}
