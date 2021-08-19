import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Nature } from '../../models/nature.model';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
 selector: 'app-report-details',
 templateUrl: './report-details.component.html',
 styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {
  
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
   rapport_confidentiel: false,
   fk_etudiant: 1,
   type_rapport:'Initiation',
   resume_rapport:''
 };
 natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
 types_rapport : String[] = ['Initiation','PFA','PFE']
 stageDisabled=false;
 Updated= false;
 Deleted= false;
 fileToUpload: File | null = null;

 constructor(private reportService: ReportService,
   private route: ActivatedRoute,
   private router: Router) { }
      
 ngOnInit(): void {
   this.getReport(this.route.snapshot.params.id); 
 }

 handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

 getReport(id: string): void {
   this.reportService.get(id)
     .subscribe(
       data => {
          this.currentReport = data;
          //console.log(data.stage_ou_projet);
          if(!data.stage_ou_projet){
            this.stageDisabled=true;
          }else{
            this.stageDisabled=false;
          }
         //console.log(this.currentReport.fk_etudiant.id)
         //this.fileToUpload = data.fichier_rapport;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }

 updateReport(): void {
  const data = {
    stage_ou_projet: this.currentReport.stage_ou_projet,
    date_debut_stage: this.currentReport.date_debut_stage,
    date_fin_stage: this.currentReport.date_fin_stage,
    intitule_stage: this.currentReport.intitule_stage,
    societe_stage: this.currentReport.societe_stage,
    secteur_societe: this.currentReport.secteur_societe,
    ville_societe: this.currentReport.ville_societe,
    pays_societe: this.currentReport.pays_societe,
    details_add_societe: this.currentReport.details_add_societe,
    encadrant: this.currentReport.encadrant,
    email_encadrant: this.currentReport.email_encadrant,
    telephone_encadrant: this.currentReport.telephone_encadrant,
    fichier_rapport: (this.fileToUpload),
    rapport_confidentiel: this.currentReport.rapport_confidentiel,
    fk_etudiant: this.currentReport.fk_etudiant.id,
    type_rapport:this.currentReport.type_rapport,
    resume_rapport:this.currentReport.resume_rapport,
  };

   this.reportService.update(this.currentReport.id, data)
     .subscribe(
       response => {
         console.log(response);
         this.Updated=true;
       },
       error => {
         console.log(error);
       });
 }

 deleteReport(): void {
   this.reportService.delete(this.currentReport.id)
     .subscribe(
       response => {
         console.log(response);
         this.Deleted=true;
         //this.router.navigate(['/reports']);
       },
       error => {
         console.log(error);
       });
 }

 myFunction(){
   var nat= <HTMLInputElement> document.getElementById("nature");
   if(nat.value[0]=='1'){
     this.currentReport.societe_stage='';
     this.currentReport.secteur_societe='';
     this.currentReport.ville_societe='';
     this.currentReport.pays_societe='';
     this.currentReport.details_add_societe='';
     this.currentReport.encadrant='';
     this.currentReport.email_encadrant='';
     this.currentReport.telephone_encadrant='';
     this.stageDisabled=true;
   }else{
     this.stageDisabled=false;
   }
 }

 ValidityWarn(){
   var submitBtn= <HTMLInputElement> document.getElementById("submitBtn");
   var ValidityFormWarn= <HTMLInputElement> document.getElementById("ValidityFormWarn");
   if( submitBtn.disabled == true ){
     ValidityFormWarn.style.display="block";
 }else{
     ValidityFormWarn.style.display="none";
 }
 }

}