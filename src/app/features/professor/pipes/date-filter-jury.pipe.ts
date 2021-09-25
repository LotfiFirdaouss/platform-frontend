import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'dateFilterJury'
})
export class DateFilterJuryPipe implements PipeTransform {

  transform(reports: Report[], date: Number): Report[] {
    if (!reports) {
      return [];
    }
    if (!date) {
      return reports;
    }

    return reports.filter( report => { 
      return report.horodateur.split('-')[0]==date;
    });
  }

}
