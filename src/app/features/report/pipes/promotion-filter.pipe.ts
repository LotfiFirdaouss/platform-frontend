import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'promotionFilter'
})
export class PromotionFilterPipe implements PipeTransform {

  transform(reports: Report[], promotion: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!promotion) {
      return reports;
    }

    return reports.filter( report => { 
      return report.fk_etudiant.promotion == promotion;
    });
  }

}
