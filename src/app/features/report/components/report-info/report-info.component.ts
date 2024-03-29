import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Professor } from 'src/app/features/professor/models/professor';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
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
     intitule_stage: null,
     societe_stage: null,
     secteur_societe: null,
     ville_societe: null,
     pays_societe: null,
     details_add_societe: null,
     parrain: null,
     email_parrain: null,
     telephone_parrain: null,
     fichier_rapport: null,
     rapport_confidentiel: false,
     fk_etudiant: 1,
     valid_admin:false,
     fk_encadrant_univ:null,
  };
   
  affiches:affiche[];
  isLoggedIn = false;
  group="";
  notHidden=false;
  currentUser: ReturnedUser;
  currentStudent: Student;
  current_encadrant_univ: Professor;
   
  constructor(private reportService: ReportService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private token: TokenStorageService,
    private studentService : StudentService,
    private professorService : ProfessorService) { }
     
  ngOnInit(): void {   
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.getReportAdministrator(this.route.snapshot.params.id);       
      }else if( this.group == "Student" ){
        this.getReportStudent(this.currentUser.id,this.route.snapshot.params.id);
      }else{
        this.getReportProfessor(this.route.snapshot.params.id);
      }
      this.notHidden;
    }    
  }

  getReportStudent(id_user: number,id: string): void {
    this.studentService.findByUser(id_user).subscribe(
      student => {
          this.currentStudent = student[0];
          this.reportService.get(id).subscribe(
            data => {
              
              this.currentReport = data;
              //console.log(data);
              if(data.fk_etudiant.id == this.currentStudent.id){
                this.notHidden=true;
              }
              if( data.type_rapport=='PFE' ){
                this.professorService.get(data.fk_encadrant_univ).subscribe(
                  data => {
                    this.current_encadrant_univ=data;
                    console.log("encadrant:",this.current_encadrant_univ);
                  },
                  error => {
                    console.log(error);
                  }
                );
              }
              //console.log(this.notHidden);
              this.getNature()
          });
    });
  }

  getReportAdministrator(id: string): void {
    this.reportService.get(id).subscribe(
        data => {
            this.currentReport = data;
            this.notHidden=true;
            this.getNature()
            if( data.type_rapport=='PFE' ){
              this.professorService.get(data.fk_encadrant_univ).subscribe(
                data => {
                  this.current_encadrant_univ=data;
                  console.log("encadrant:",this.current_encadrant_univ);
                },
                error => {
                  console.log(error);
                }
              );
            }
        }
    );
  }

  getReportProfessor(id: string): void {
    this.reportService.get(id).subscribe(
        data => {
            this.currentReport = data;
            this.getNature()
            if( data.type_rapport=='PFE' ){
              this.professorService.get(data.fk_encadrant_univ).subscribe(
                data => {
                  this.current_encadrant_univ=data;
                  console.log("encadrant:",this.current_encadrant_univ);
                },
                error => {
                  console.log(error);
                }
              );
            }
        }
    );
  }
   
  getNature():Array<affiche>{
    var conf = 'non';
    if(this.currentReport.rapport_confidentiel==true){
      conf = 'oui'
    }
    if(this.currentReport.stage_ou_projet==true){
      this.affiches = [{champ:'Nature',info:'stage',user:true},
          {champ:'Société',info:this.currentReport.societe_stage,user:!!this.currentReport.societe_stage},
          {champ:'Secteur',info:this.currentReport.secteur_societe,user:!!this.currentReport.secteur_societe},
          {champ:'Pays',info:this.currentReport.pays_societe,user:!!this.currentReport.pays_societe},
          {champ:'Ville',info:this.currentReport.ville_societe,user:!!this.currentReport.ville_societe},
          {champ:'plus de détails sur la société',info:this.currentReport.details_add_societe, user:this.notHidden && !!this.currentReport.details_add_societe },
          {champ:'Nom du parrain',info:this.currentReport.parrain, user:this.notHidden && !!this.currentReport.parrain},
          {champ:'Email du parrain',info:this.currentReport.email_parrain, user:this.notHidden && !!this.currentReport.email_parrain},
          {champ:'télephone du parrain', info:this.currentReport.telephone_parrain, user:this.notHidden && !!this.currentReport.telephone_parrain},
          {champ:'Rapport confidentiel',info: conf,user:this.notHidden},]
          //console.log(this.notHidden && this.currentReport.details_add_societe);                
        return this.affiches        
     }
     this.affiches = [{champ:'Nature',info:'projet',user:true},
          {champ:'Rapport confidentiel',info: conf,user:this.notHidden}]
     return this.affiches
   }

   fileLinkPFE(){    
     //return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentReport.fichier_rapport.toString());
     var fileLink= this.currentReport.fichier_rapport.toString().split('&')[0]+"#zoom=100"+"&toolbar=0";
     return this.sanitizer.bypassSecurityTrustResourceUrl(fileLink);
    }
    
    fileLink(){    
     //return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentReport.fichier_rapport.toString());
     var fileLink= this.currentReport.fichier_rapport.toString().split('&')[0]+"#zoom=100";
     return this.sanitizer.bypassSecurityTrustResourceUrl(fileLink);
    }

    scrollFunction(){
      console.log("hi")
      var pdf = document.getElementById("pdfFile");
      console.log(pdf.scrollLeft)
      pdf.scrollLeft+=200;
      console.log("hh",pdf.scrollLeft)
    }
   
}

export class affiche {
   champ:string;
   info:any;
   user:Boolean;
  }