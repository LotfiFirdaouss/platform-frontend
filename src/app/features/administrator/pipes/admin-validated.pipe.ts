import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'adminValidated'
})
export class AdminValidatedPipe implements PipeTransform {

  transform(reports: Report[], valid_admin: String): Report[] {
    if (!reports) {
      return [];
    }
    if (!valid_admin) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportValidatedOrNotByAdmin(report, valid_admin);
    });
  }

  reportValidatedOrNotByAdmin(report: Report, valid_admin){
    if( valid_admin == "V" && report.valid_admin ){
      return true;
    }else if( valid_admin == "NV" && !report.valid_admin ){
      return true;
    }
    return false;
  }

}
