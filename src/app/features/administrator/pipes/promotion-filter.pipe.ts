import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'promotionFilterDashboard'
})
export class PromotionFilterDashboardPipe implements PipeTransform {

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
