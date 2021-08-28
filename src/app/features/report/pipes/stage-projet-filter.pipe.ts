import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'stageProjetFilter'
})
export class StageProjetFilterPipe implements PipeTransform {

  transform(reports: Report[], selectedStageProjet: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!selectedStageProjet) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportStageOuProjet(report, selectedStageProjet);
    });
  }

  private reportStageOuProjet(report: Report, selectedStageProjet){
    if( selectedStageProjet == "stage" && report.stage_ou_projet ){
      return true;
    }else if( selectedStageProjet == "projet" && !report.stage_ou_projet ){
      return true;
    }
    return false;
  }

}
