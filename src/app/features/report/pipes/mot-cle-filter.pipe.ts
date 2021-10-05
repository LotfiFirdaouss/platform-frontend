import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report';

@Pipe({
  name: 'motCleFilter'
})
export class MotCleFilterPipe implements PipeTransform {

  transform(reports: Report[], mots: string): Report[] {
    if (!reports) {
      return [];
    }
    if (!mots) {
      return reports;
    }

    return reports.filter( report => { 
      return this.reportContainsFilterMot(report,mots);
    });
  }

  reportContainsFilterMot(report: Report, mots: string){
    mots = mots.toLocaleLowerCase();
    const filterTerms = mots.split(' ');
    for (const filterTerm of filterTerms) {
      const hasFilterTerm = this.reportHasKeyWord(report, filterTerm);
      if (hasFilterTerm === false) {
        return false;
      }
    }
    return true;
  }  

  reportHasKeyWord(report: Report, mot: string){
    console.log("here")
    let containsWord=false;
    for(let word of report.mots){
      if(word.mot.toLocaleLowerCase().includes(mot.toLocaleLowerCase())){
        containsWord=true;
      }
    }
    return containsWord;
  }

}
