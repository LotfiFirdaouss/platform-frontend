import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'allFiltersIn'
})
export class AllFiltersInPipe implements PipeTransform {

  transform(reports: Report[], promotion: string,filterCode: String): Report[] {
    if (!reports) {
      return [];
    }
    if (!promotion && !filterCode) {
      return reports;
    }

    // return reports.filter( report => { 
    //   return report.fk_etudiant.promotion == promotion;    });

      return reports.filter( report => { 
        if( promotion && !filterCode ){
          return report.fk_etudiant.promotion == promotion
        }
        else if( filterCode && !promotion){
          console.log(report.fk_etudiant.code_etudiant == filterCode)
          return report.fk_etudiant.code_etudiant == filterCode; 
        }
        else if(promotion && filterCode){
          return report.fk_etudiant.promotion == promotion && report.fk_etudiant.code_etudiant == filterCode;
        }
      });
  }


}
