import { Component, OnInit } from '@angular/core';
import { Nature } from 'src/app/features/report/models/nature.model';
import { Report } from 'src/app/features/report/models/report';
import { ReportService } from 'src/app/features/report/services/report.service';

@Component({
  selector: 'app-report-validation',
  templateUrl: './report-validation.component.html',
  styleUrls: ['./report-validation.component.css']
})
export class ReportValidationComponent implements OnInit {

  reports?: Report[];
  edit: { [key: string]: { edit: boolean }} = {}; 
  currentReport?: Report;
  currentIndex = -1;

  natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
  types_rapport=['Initiation','PFA','PFE']

  //for pagination
  p: number = 1;

  //filters
  filterPromotion:'';
  selectFiliere:'';
  selectedReportType:"";
  selectedValidatedAdmin:"";


  constructor(private reportService : ReportService) { }

  ngOnInit(): void {
    this.retrieveReports();
  }

  retrieveReports(): void {
    this.reportService.getAll()
      .subscribe(
        data => {
          this.reports = data;
          this.reports.forEach(item => {
            this.edit[item.id]= {
              edit: false
            };
          });
        },
        error => {
          console.log(error);
        });
  }

  setActiveReport(report: Report, index: number): void {
    this.currentReport = report;
    this.currentIndex = index;
  }

  deleteReport(id:number): void {
    const index = this.reports.findIndex(item => item.id === id);
    this.reportService.delete(id).subscribe(
      response => {
        this.retrieveReports();
      });   
  }

  startEditReport(id:number): void {
    this.edit[id].edit = true;
  }

  cancelEditReport(): void {    
    this.retrieveReports();
  }

  saveEditReport(id: string): void {
    
    const index = this.reports.findIndex(item => item.id === id);
    const data = { 
      fk_etudiant:this.reports[index].fk_etudiant.id,
      stage_ou_projet:this.reports[index].stage_ou_projet,
      // date_debut_stage:this.reports[index].date_debut_stage,
      // date_fin_stage:this.reports[index].date_fin_stage,
      intitule_stage:this.reports[index].intitule_stage,
      societe_stage:this.reports[index].societe_stage,
      secteur_societe:this.reports[index].secteur_societe,
      // ville_societe:this.reports[index].ville_societe,
      // pays_societe:this.reports[index].pays_societe,
      rapport_confidentiel:this.reports[index].rapport_confidentiel,
      type_rapport:this.reports[index].type_rapport,
      valid_admin:this.reports[index].valid_admin,
      // email_encadrant:this.reports[index].email_encadrant,
      // telephone_encadrant:this.reports[index].telephone_encadrant,
    };
    if(this.reports[index].date_debut_stage!=null && this.reports[index].date_fin_stage){
      data['date_debut_stage']=this.reports[index].date_debut_stage;
      data['date_fin_stage']=this.reports[index].date_fin_stage;
    }
    if(this.reports[index].ville_societe!=null){
      data['ville_societe']=this.reports[index].ville_societe;
    }
    if(this.reports[index].pays_societe!=null){
      data['pays_societe']=this.reports[index].pays_societe;
    }
    this.reportService.update(this.reports[index].id, data)
     .subscribe(
       response => {
         this.retrieveReports();
       },
       error => {
         console.log(error);
      });
  }

  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renitialiserFiltres(){
    this.filterPromotion='';
    this.selectFiliere='';
    this.selectedReportType='';
    this.selectedValidatedAdmin='';
  }

}
