import { Pipe, PipeTransform } from '@angular/core';
import { Insertion } from '../models/insertion.model';

@Pipe({
  name: 'promotionInsertionFilter'
})
export class PromotionInsertionFilterPipe implements PipeTransform {

  transform(insertions: Insertion[], promotion: string): Insertion[] {
    if (!insertions) {
      return [];
    }
    if (!promotion) {
      return insertions;
    }

    return insertions.filter( insertion => { 
      return insertion.fk_etudiant.promotion == promotion;
    });
  }

}
