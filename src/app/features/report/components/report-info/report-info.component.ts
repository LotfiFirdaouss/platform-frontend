import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
     fichier_rapport: null,
     rapport_confidentiel: false,
     fk_etudiant: 1,
   };
   
   affiches:affiche[];
   
   constructor(private reportService: ReportService,
     private route: ActivatedRoute,
     private sanitizer: DomSanitizer) { }
     
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
     var details_soc='------'
     if(this.currentReport.rapport_confidentiel==true){
        conf = 'oui'
     }
     if(this.currentReport.details_add_societe){
       details_soc=this.currentReport.details_add_societe.toString();
     }
     if(this.currentReport.stage_ou_projet==true){
       this.affiches = [{champ:'Nature',info:'stage'},
                        {champ:'Société',info:this.currentReport.societe_stage},
                        {champ:'Secteur',info:this.currentReport.secteur_societe},
                        {champ:'Pays',info:this.currentReport.pays_societe},
                        {champ:'Ville',info:this.currentReport.ville_societe},
                        {champ:'plus de détails sur la société',info:details_soc},
                        {champ:'Nom d\'encadrant',info:this.currentReport.encadrant},
                        {champ:'Email d\'encadrant',info:this.currentReport.email_encadrant},
                        {champ:'télephone d\'encadrant',info:this.currentReport.telephone_encadrant},
                        {champ:'Rapport confidentiel',info: conf},]
        return this.affiches
     }
     this.affiches = [{champ:'Nature',info:'projet'},
                        {champ:'Rapport confidentiel',info: conf}]
     return this.affiches
   }

   fileLink(){
     //return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentReport.fichier_rapport.toString());
     return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentReport.fichier_rapport.toString());
    }
   
}

export class affiche {
   champ:string;
   info:string
  }