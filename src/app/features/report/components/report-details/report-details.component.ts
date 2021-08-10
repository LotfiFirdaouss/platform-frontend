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
   lien_rapport: '',
   rapport_confidentiel: false,
   fk_etudiant: 1,
 };
 natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
 stageDisabled=false;
 Updated= false;
 Deleted= false;

 constructor(private reportService: ReportService,
   private route: ActivatedRoute,
   private router: Router) { }
      
 ngOnInit(): void {
   this.getReport(this.route.snapshot.params.id); 
 }


 getReport(id: string): void {
   this.reportService.get(id)
     .subscribe(
       data => {
         this.currentReport = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }

 updateReport(): void {
   this.reportService.update(this.currentReport.id, this.currentReport)
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