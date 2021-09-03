import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'univInsertionFilter'
})
export class UnivInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], univ: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!univ) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.univ.toLocaleLowerCase().includes(univ.toLocaleLowerCase());
    });
  }

}
