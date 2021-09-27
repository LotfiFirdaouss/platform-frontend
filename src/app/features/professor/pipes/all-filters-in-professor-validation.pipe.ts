import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../report/models/report';

@Pipe({
  name: 'allFiltersInProfessorValidation'
})
export class AllFiltersInProfessorValidationPipe implements PipeTransform {

  transform(reports: Report[], promotion: string,filiere: string,valid_encadrant: String,dateFilter: Number): Report[] {
    if (!reports) {
      return [];
    }
    if (!promotion && !filiere && !valid_encadrant && !dateFilter) {
      console.log("fff")
      return reports;
    }

    // return reports.filter( report => { 
    //   return report.fk_etudiant.promotion == promotion;    });

      return reports.filter( report => { 
        console.log("heere")

        if( promotion && !filiere && !dateFilter && !valid_encadrant ){
          return report.fk_etudiant.promotion == promotion
        }
        else if( filiere && !promotion && !dateFilter && !valid_encadrant){
          return filiere==report.fk_etudiant.filiere
        }
        else if( dateFilter && !filiere && !promotion && !valid_encadrant ){
          //console.log(this.reportIsOfDate(report, dateFilter))
          return this.reportIsOfDate(report, dateFilter)
        }
        else if( valid_encadrant && !filiere && !promotion && !dateFilter ){
          return this.reportValidatedOrNotByProfessor(report, valid_encadrant); 
        }
        else if(promotion && filiere && !dateFilter && !valid_encadrant){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere;
        }
        else if(promotion && !filiere && dateFilter && !valid_encadrant){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfDate(report, dateFilter) ;
        }
        else if(promotion && !filiere && !dateFilter && valid_encadrant){
          return report.fk_etudiant.promotion == promotion && this.reportValidatedOrNotByProfessor(report, valid_encadrant);
        }
        else if(!promotion && filiere && dateFilter && !valid_encadrant){
          return filiere==report.fk_etudiant.filiere
          && this.reportIsOfDate(report, dateFilter);
        }
        else if(!promotion && filiere && !dateFilter && valid_encadrant){
          return filiere==report.fk_etudiant.filiere
          && this.reportValidatedOrNotByProfessor(report, valid_encadrant); 
        }
        else if(!promotion && !filiere && dateFilter && valid_encadrant){
          return this.reportIsOfDate(report, dateFilter) 
          && this.reportValidatedOrNotByProfessor(report, valid_encadrant); 
        }
        else if(promotion && filiere && dateFilter && !valid_encadrant){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
          && this.reportIsOfDate(report, dateFilter);
        }
        else if(promotion && filiere && !dateFilter && valid_encadrant){
          return report.fk_etudiant.promotion == promotion && filiere==report.fk_etudiant.filiere
          && this.reportValidatedOrNotByProfessor(report, valid_encadrant);
        }
        else if(promotion && !filiere && dateFilter && valid_encadrant){
          return report.fk_etudiant.promotion == promotion && this.reportIsOfDate(report, dateFilter)
          && this.reportValidatedOrNotByProfessor(report, valid_encadrant);
        }
        else if(!promotion && filiere && dateFilter && valid_encadrant){
          return this.reportIsOfDate(report, dateFilter) && filiere==report.fk_etudiant.filiere
          && this.reportValidatedOrNotByProfessor(report, valid_encadrant);
        }
        else if(promotion && filiere && dateFilter && valid_encadrant){
          // console.log("here2")
          return report.fk_etudiant.promotion == promotion && this.reportIsOfDate(report, dateFilter) && 
          filiere==report.fk_etudiant.filiere && this.reportValidatedOrNotByProfessor(report, valid_encadrant);
        }
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

  private reportIsOfDate(report : Report, dateFilter){
    return report.horodateur.split('-')[0]==dateFilter;
  }

}
