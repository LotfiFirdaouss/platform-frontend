import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'allFiltersIn'
})
export class AllFiltersInPipe implements PipeTransform {

  transform(reports: Report[], promotion: string,filiere: string,valid_admin: String,selectedReportType: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!promotion && !filiere && !valid_admin && !selectedReportType) {
      console.log("fff")
      return reports;
    }

    // return reports.filter( report => { 
    //   return report.fk_etudiant.promotion == promotion;    });

      return reports.filter( report => { 
        // console.log("heere")

        if( promotion && !filiere && !selectedReportType && !valid_admin ){
          return report.fk_etudiant.promotion == promotion
        }
        else if( filiere && !promotion && !selectedReportType && !valid_admin){
          return filiere==report.fk_etudiant.filiere
        }
        else if( selectedReportType && !filiere && !promotion && !valid_admin ){
          //console.log(this.reportIsOfType(report, selectedReportType))
          return this.reportIsOfType(report, selectedReportType)
        }
        else if( valid_admin && !filiere && !promotion && !selectedReportType ){
          return this.reportValidatedOrNotByAdmin(report, valid_admin); 
        }
        else if(promotion && filiere && !selectedReportType && !valid_admin){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere;
        }
        else if(promotion && !filiere && selectedReportType && !valid_admin){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfType(report, selectedReportType) ;
        }
        else if(promotion && !filiere && !selectedReportType && valid_admin){
          return report.fk_etudiant.promotion == promotion && this.reportValidatedOrNotByAdmin(report, valid_admin);
        }
        else if(!promotion && filiere && selectedReportType && !valid_admin){
          return filiere==report.fk_etudiant.filiere
          && this.reportIsOfType(report, selectedReportType);
        }
        else if(!promotion && filiere && !selectedReportType && valid_admin){
          return filiere==report.fk_etudiant.filiere
          && this.reportValidatedOrNotByAdmin(report, valid_admin); 
        }
        else if(!promotion && !filiere && selectedReportType && valid_admin){
          return this.reportIsOfType(report, selectedReportType) 
          && this.reportValidatedOrNotByAdmin(report, valid_admin); 
        }
        else if(promotion && filiere && selectedReportType && !valid_admin){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
          && this.reportIsOfType(report, selectedReportType);
        }
        else if(promotion && filiere && !selectedReportType && valid_admin){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
          && this.reportValidatedOrNotByAdmin(report, valid_admin);
        }
        else if(promotion && !filiere && selectedReportType && valid_admin){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfType(report, selectedReportType)
          && this.reportValidatedOrNotByAdmin(report, valid_admin);
        }
        else if(!promotion && filiere && selectedReportType && valid_admin){
          return this.reportIsOfType(report, selectedReportType) && filiere==report.fk_etudiant.filiere
          && this.reportValidatedOrNotByAdmin(report, valid_admin);
        }
        else if(promotion && filiere && selectedReportType && valid_admin){
          // console.log("here2")
          return report.fk_etudiant.promotion == promotion && this.reportIsOfType(report, selectedReportType) && 
          filiere==report.fk_etudiant.filiere && this.reportValidatedOrNotByAdmin(report, valid_admin);
        }
    //     return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
    //   && this.reportIsOfType(report, selectedReportType) && this.reportValidatedOrNotByAdmin(report, valid_admin); 
       });
  }

  reportValidatedOrNotByAdmin(report: Report, valid_admin){
    if( valid_admin == "V" && report.valid_admin ){
      return true;
    }else if( valid_admin == "NV" && !report.valid_admin ){
      return true;
    }
    return false;
  }

  private reportIsOfType(report : Report, selectedReportType){
    //console.log(selectedReportType)
    if( selectedReportType==report.type_rapport){
      return true;
    }
    return false;
  }

}
