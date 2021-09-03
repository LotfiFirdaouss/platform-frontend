import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'insertionTypeFilter'
})
export class InsertionTypeFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], selectedInsertionType): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!selectedInsertionType) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return selectedInsertionType==insertion.cursus_post_ensam;
    });
  }

}
