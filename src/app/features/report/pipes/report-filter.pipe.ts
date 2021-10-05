import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'reportFilter'
})
export class ReportFilterPipe implements PipeTransform {

  transform(reports: Report[], filterText: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!filterText) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportContainsFilterText(report, filterText);
    });
  }

  private reportContainsFilterText(report: Report, filterText): boolean {
    filterText = filterText.toLocaleLowerCase();
    const filterTerms = filterText.split(' ');
    for (const filterTerm of filterTerms) {
      const hasFilterTerm = this.reportContainsFilterTerm(report, filterTerm);
      if (hasFilterTerm === false) {
        return false;
      }
    }
    return true;
  }

  private reportContainsFilterTerm(report: Report, filterTerm: string) {
    var value= false;
    value = report.intitule_stage?.toLocaleLowerCase().includes(filterTerm);
    console.log("value: ",value)
    return value;
    }

}
