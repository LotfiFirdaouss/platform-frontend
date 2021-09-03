import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'reportTypeFilter'
})
export class ReportTypeFilterPipe implements PipeTransform {

  transform(reports: Report[], selectedReportType: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!selectedReportType) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportIsOfType(report, selectedReportType);
    });
  }

  private reportIsOfType(report : Report, selectedReportType){
    //console.log(selectedReportType)
    if( selectedReportType==report.type_rapport){
      return true;
    }
    return false;
  }

}
