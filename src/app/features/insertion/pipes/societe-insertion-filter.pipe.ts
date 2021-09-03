import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'societeInsertionFilter'
})
export class SocieteInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], societe: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!societe) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.societe.toLocaleLowerCase().includes(societe.toLocaleLowerCase());
    });
  }

}
