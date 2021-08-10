import { Component, OnInit } from '@angular/core';
import { Nature } from '../../models/nature.model';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
  
  report: Report = {
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
  submitted = false;
  active = true;
  natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
  stageDisabled= false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }
  saveReport(): void {
    const data = {
      stage_ou_projet: this.report.stage_ou_projet,
      date_debut_stage: this.report.date_debut_stage,
      date_fin_stage: this.report.date_fin_stage,
      intitule_stage: this.report.intitule_stage,
      societe_stage: this.report.societe_stage,
      secteur_societe: this.report.secteur_societe,
      ville_societe: this.report.ville_societe,
      pays_societe: this.report.pays_societe,
      details_add_societe: this.report.details_add_societe,
      encadrant: this.report.encadrant,
      email_encadrant: this.report.email_encadrant,
      telephone_encadrant: this.report.telephone_encadrant,
      lien_rapport: this.report.lien_rapport,
      rapport_confidentiel: this.report.rapport_confidentiel,
      fk_etudiant: this.report.fk_etudiant
    };

    this.reportService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  myFunction(){
    var nat= <HTMLInputElement> document.getElementById("nature");
    if(nat.value[0]=='1'){
      this.report.societe_stage='';
      this.report.secteur_societe='';
      this.report.ville_societe='';
      this.report.pays_societe='';
      this.report.details_add_societe='';
      this.report.encadrant='';
      this.report.email_encadrant='';
      this.report.telephone_encadrant='';
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
