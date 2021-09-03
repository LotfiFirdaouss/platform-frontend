import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'secteurSocieteFilter'
})
export class SecteurSocieteFilterPipe implements PipeTransform {

  transform(reports: Report[], SecteurSocieteText: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!SecteurSocieteText) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportInSecteur(report, SecteurSocieteText);
    });
  }

  private reportInSecteur(report : Report, SecteurSocieteText){
    return report.secteur_societe?.toLocaleLowerCase().includes(SecteurSocieteText.toLocaleLowerCase());
  }

}
