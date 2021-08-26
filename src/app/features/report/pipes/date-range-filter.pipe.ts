import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(reports: Report[], StartDateReport: Date, EndDateReport : Date): Report[] {
    if (!reports) {
      return [];
    }
    if (!StartDateReport && !EndDateReport) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportInDateRange(report, StartDateReport, EndDateReport);
    });
  }

  private reportInDateRange(report : Report, StartDateReport , EndDateReport ){
    if( !StartDateReport || !EndDateReport ){
      if( StartDateReport ){
        return report.date_debut_stage >= StartDateReport;
      }else if ( EndDateReport ) {
        return report.date_fin_stage <= EndDateReport;
      }
    }else if ( StartDateReport && EndDateReport){
      return (report.date_debut_stage >= StartDateReport) && (report.date_fin_stage <= EndDateReport);
    }
    return false;
  }

}
