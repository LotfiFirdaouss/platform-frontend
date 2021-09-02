import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'filiereFilter'
})
export class FiliereFilterPipe implements PipeTransform {

  transform(reports: Report[], filiere: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!filiere) {
      return reports;
    }

    return reports.filter( report => { 
      return filiere==report.fk_etudiant.filiere;
    });
  }

}
