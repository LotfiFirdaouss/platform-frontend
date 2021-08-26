import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'confidentielFilter'
})
export class ConfidentielFilterPipe implements PipeTransform {

  transform(reports: Report[], selectedConfidentiel: boolean): Report[] {
    if (!reports) {
      return [];
    }
    if (!selectedConfidentiel) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportConfidentiel(report, selectedConfidentiel);
    });
  }

  private reportConfidentiel(report :Report, selectedConfidentiel){
    //console.log(selectedConfidentiel)
    if( selectedConfidentiel && report.rapport_confidentiel ){
      return true;
    }
    return false;
  }

}
