import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'adminValidated'
})
export class AdminValidatedPipe implements PipeTransform {

  transform(reports: Report[], valid_admin: boolean): Report[] {
    if (!reports) {
      return [];
    }
    if (!valid_admin) {
      return reports;
    }

    return reports.filter( report => { 
      return report.valid_admin == valid_admin;
    });
  }

}
