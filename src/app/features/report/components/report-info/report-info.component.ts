import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
   selector: 'app-report-info',
   templateUrl: './report-info.component.html',
   styleUrls: ['./report-info.component.css']
  })
export class ReportInfoComponent implements OnInit {
  
   currentReport: Report = {
     stage_ou_projet: true,
     date_debut_stage: new Date(),
     date_fin_stage: new Date(),
     intitule_stage: '',
     societe_stage: '',
     secteur_societe: '',
     ville_societe: '',
     pays_societe: '',
     details_add_societe: '',
     encadrant: '',
     email_encadrant: '',
     telephone_encadrant: '',
     lien_rapport: '',
     rapport_confidentiel: false,
     fk_etudiant: 1,
   };
   
   affiches:affiche[];
   
   constructor(private reportService: ReportService,
     private route: ActivatedRoute) { }
     
   ngOnInit(): void {
     this.getReport(this.route.snapshot.params.id);
     
   }
   
   getReport(id: string): void {
     this.reportService.get(id)
       .subscribe(
         data => {
           this.currentReport = data;
           this.getNature()
           console.log(data);
         },
         error => {
           console.log(error);
         });
   }
   
   getNature():Array<affiche>{
     var conf = 'non';
     if(this.currentReport.rapport_confidentiel==true){
        conf = 'oui'
     }
     if(this.currentReport.stage_ou_projet==true){
       this.affiches = [{champ:'Nature',info:'stage'},
                        {champ:'Date de début',info:this.currentReport.date_debut_stage},
                        {champ:'Date de fin',info:this.currentReport.date_fin_stage},
                        {champ:'Lien de rapport',info:this.currentReport.lien_rapport},
                        {champ:'Rapport confidentiel',info: conf},
                        {champ:'Société',info:this.currentReport.societe_stage},
                        {champ:'Secteur',info:this.currentReport.secteur_societe},
                        {champ:'Pays',info:this.currentReport.pays_societe},
                        {champ:'Ville',info:this.currentReport.ville_societe},
                        {champ:'plus de détails sur la société',info:this.currentReport.details_add_societe},
                        {champ:'Nom d\'encadrant',info:this.currentReport.encadrant},
                        {champ:'Email d\'encadrant',info:this.currentReport.email_encadrant},
                        {champ:'télephone d\'encadrant',info:this.currentReport.telephone_encadrant}]
        return this.affiches
     }
     this.affiches = [{champ:'Nature',info:'stage'},
                        {champ:'Date de début',info:new Date(this.currentReport.date_debut_stage)},
                        {champ:'Date de fin',info:new Date(this.currentReport.date_fin_stage)},
                        {champ:'Lien de rapport',info:this.currentReport.lien_rapport},
                        {champ:'Rapport confidentiel',info: conf}]
     return this.affiches
   }
   
}

export class affiche {
   champ:string;
   info:string
  }