import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'villePaysFilter'
})
export class VillePaysFilterPipe implements PipeTransform {

  transform(reports: Report[], VillePaysText: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!VillePaysText) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportInVillePays(report, VillePaysText);
    });
  }

  private reportInVillePays(report : Report, VillePaysText){
    VillePaysText = VillePaysText.toLocaleLowerCase();
    return report.ville_societe.toLocaleLowerCase().includes(VillePaysText) ||
    report.pays_societe.toLocaleLowerCase().includes(VillePaysText);
  }

}
