import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'professorValidated'
})
export class ProfessorValidatedPipe implements PipeTransform {


  transform(reports: Report[], valid_encadrant: String): Report[] {
    if (!reports) {
      return [];
    }
    if (!valid_encadrant) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportValidatedOrNotByProfessor(report, valid_encadrant);
    });
  }

  reportValidatedOrNotByProfessor(report: Report, valid_encadrant){
    if( valid_encadrant == "V" && report.valid_encadrant ){
      return true;
    }else if( valid_encadrant == "NV" && !report.valid_encadrant ){
      return true;
    }
    return false;
  }

}
