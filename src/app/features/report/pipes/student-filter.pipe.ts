import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {

  transform(reports: Report[], student: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!student) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportOfStudent(report, student);
    });
  }

  private reportOfStudent(report : Report, student){
    return report.fk_etudiant.prenom.toLocaleLowerCase().includes(student.toLocaleLowerCase())
    || report.fk_etudiant.nom.toLocaleLowerCase().includes(student.toLocaleLowerCase());
  }

}
