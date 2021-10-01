import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'allFiltersIn'
})
export class AllFiltersInPipe implements PipeTransform {

  transform(reports: Report[], promotion: string,filiere: string,filterCode: String,selectedReportType: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!promotion && !filiere && !filterCode && !selectedReportType) {
      console.log("fff")
      return reports;
    }

    // return reports.filter( report => { 
    //   return report.fk_etudiant.promotion == promotion;    });

      return reports.filter( report => { 
        if( promotion && !filiere && !selectedReportType && !filterCode ){
          return report.fk_etudiant.promotion == promotion
        }
        else if( filiere && !promotion && !selectedReportType && !filterCode){
          return filiere==report.fk_etudiant.filiere
        }
        else if( selectedReportType && !filiere && !promotion && !filterCode ){
          return this.reportIsOfType(report, selectedReportType)
        }
        else if( filterCode && !filiere && !promotion && !selectedReportType ){
          return report.fk_etudiant.code_etudiant == filterCode; 
        }
        else if(promotion && filiere && !selectedReportType && !filterCode){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere;
        }
        else if(promotion && !filiere && selectedReportType && !filterCode){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfType(report, selectedReportType) ;
        }
        else if(promotion && !filiere && !selectedReportType && filterCode){
          return report.fk_etudiant.promotion == promotion && report.fk_etudiant.code_etudiant == filterCode;
        }
        else if(!promotion && filiere && selectedReportType && !filterCode){
          return filiere==report.fk_etudiant.filiere
          && this.reportIsOfType(report, selectedReportType);
        }
        else if(!promotion && filiere && !selectedReportType && filterCode){
          return filiere==report.fk_etudiant.filiere
          && report.fk_etudiant.code_etudiant == filterCode; 
        }
        else if(!promotion && !filiere && selectedReportType && filterCode){
          return this.reportIsOfType(report, selectedReportType) 
          && report.fk_etudiant.code_etudiant == filterCode; 
        }
        else if(promotion && filiere && selectedReportType && !filterCode){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
          && this.reportIsOfType(report, selectedReportType);
        }
        else if(promotion && filiere && !selectedReportType && filterCode){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
          && report.fk_etudiant.code_etudiant == filterCode;
        }
        else if(promotion && !filiere && selectedReportType && filterCode){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfType(report, selectedReportType)
          && report.fk_etudiant.code_etudiant == filterCode;
        }
        else if(!promotion && filiere && selectedReportType && filterCode){
          return this.reportIsOfType(report, selectedReportType) && filiere==report.fk_etudiant.filiere
          && report.fk_etudiant.code_etudiant == filterCode;
        }
        else if(promotion && filiere && selectedReportType && filterCode){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfType(report, selectedReportType) && 
          filiere==report.fk_etudiant.filiere && report.fk_etudiant.code_etudiant == filterCode;
        }
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
