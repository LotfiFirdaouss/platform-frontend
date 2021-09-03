import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'societeFilter'
})
export class SocieteFilterPipe implements PipeTransform {

  transform(reports: Report[], SocieteText: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!SocieteText) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportInSociete(report, SocieteText);
    });
  }

  private reportInSociete(report : Report, SocieteText){
    return report.societe_stage?.toLocaleLowerCase().includes(SocieteText.toLocaleLowerCase());
  }

}
