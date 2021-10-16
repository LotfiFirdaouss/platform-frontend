import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { MyFormService } from 'src/app/features/administrator/services/my-form.service';
import { Professor } from 'src/app/features/professor/models/professor';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { CountryCities } from 'src/app/shared/models/country-cities';
import { Nature } from '../../models/nature.model';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';
import { Country, State, City }  from 'country-state-city';


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  //add jury
  alljurys=[,,0,0];
  jury3=false;
  jury4=false;
  addJury=true;

  report: Report = {
    stage_ou_projet: true,
    date_debut_stage: new Date(),
    date_fin_stage: new Date(),
    intitule_stage: '',
    societe_stage: '',
    secteur_societe: '',
    ville_societe: 'Casablanca',
    pays_societe: 'Morocco',
    details_add_societe: '',
    parrain: '',
    email_parrain: '',
    telephone_parrain: '',
    fichier_rapport: null,
    rapport_confidentiel: false,
    fk_etudiant: 0,
    type_rapport:'Initiation',
    resume_rapport:'',
    fk_encadrant_univ:null, 
  };

  //Mot clé
  allmots=[];
  mot4=false;
  mot5=false;
  addmot=true;

  //to get value of student_id
  isLoggedIn = false;
  currentUser!: ReturnedUser;
  currentStudent!: Student;
  
  submitted = false;
  active = true;
  natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
  types_rapport : String[] = ['Initiation','PFA','PFE']
  stageDisabled= false;
  fileToUpload: File | null = null;

  //for cities and countries
  countryList: Array<CountryCities>=[];

  cities: Array<any>;

  autreVille_societe="";
  otherCityHidden=true; 

  //file validation
  fileSizeError=false;
  fileTypeError=false;

  

  //form active or not
  canAddReport=true;
  DBreportForm={
    "id": 0,
    "nom_form": '',
    "active_status": true
  }

  hideSpinner=true;

    /* the form reference */
    @ViewChild('reportForm') reportForm: NgForm;
  professors?: Professor[];
  professeurs?: Professor[];


  constructor(private reportService: ReportService,
    private token: TokenStorageService,
    private studentService: StudentService,
    private professorService: ProfessorService,
    private myFormService : MyFormService) { }

  ngOnInit(): void {
    this.initiateCoutriesCities()
    this.isLoggedIn = !!this.token.getToken();
    //console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      var user_id = this.currentUser.id;
      this.getStudent(user_id);
    }
    //we get the value of this.canAddReport from the db (table forms)
    this.CanAddReport();
    this.cities = this.countryList.find(con => con.name == this.report.pays_societe).cities;
    this.retreiveProfessors();
  }

  initiateCoutriesCities(){    
    for(var country of Country.getAllCountries()){
      let citiesOfCoutry=[]
      for(let city of  City.getCitiesOfCountry(country.isoCode)){
        citiesOfCoutry.push(city.name);
      } 
      citiesOfCoutry.push("Autre")
      this.countryList.push({
        "name":country.name,
        "cities":citiesOfCoutry
      })
    }
  }

  retreiveProfessors(){
    this.professorService.getAll().subscribe(
      data => {
        this.professors = data;
        this.professeurs=data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
          this.report.fk_etudiant= this.currentStudent.id;
        },
        error => {
          console.log(error);
        });
  }

  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

  changeCity(city){
    if(city =="Autre"){
      this.otherCityHidden=false;
    }else{
      this.otherCityHidden=true;
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    var size = this.fileToUpload.size/1000;

    //setting the errors
    size > 40000 ? this.fileSizeError=true : this.fileSizeError=false;
    this.fileToUpload.type!="application/pdf" ? this.fileTypeError=true : this.fileTypeError=false;

    //setting the errors to be considered in form validation
    if(this.fileSizeError || this.fileTypeError){
      this.reportForm.form.controls['fichier_rapport'].setErrors({'incorrect': true});
    }else{
      this.reportForm.form.controls['fichier_rapport'].setErrors(null);
    }
    //console.log(size.toString()+"kb")
    //console.log(this.fileToUpload.type)
  }

  saveReport(): void {
    this.hideSpinner=false;
    if(this.report.ville_societe=="Autre"){
      this.report.ville_societe = this.autreVille_societe;
    }
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
      parrain: this.report.parrain,
      email_parrain: this.report.email_parrain,
      telephone_parrain: this.report.telephone_parrain,
      fichier_rapport: (this.fileToUpload),
      rapport_confidentiel: this.report.rapport_confidentiel,
      fk_etudiant: this.report.fk_etudiant,
      type_rapport:this.report.type_rapport,
      resume_rapport:this.report.resume_rapport,
    };
 
    if(this.report.type_rapport=="PFE"){
      data['fk_encadrant_univ']=this.report.fk_encadrant_univ;
    }else{
      data['fk_encadrant_univ']="";
    }
    let arrayMot = this.mots();
    //post the new words
    this.reportService.postMotsClés(arrayMot);

    this.reportService.create(data,this.currentStudent)
      .subscribe(
        response => {
            //console.log(response);
            let idsmots=[];
            this.reportService.getMotCle(arrayMot[0]).subscribe(
              motcle1 => {
                idsmots.push(motcle1.id);
                this.reportService.getMotCle(arrayMot[1]).subscribe(
                  motcle2 => {
                    idsmots.push(motcle2.id);
                    this.reportService.getMotCle(arrayMot[2]).subscribe(
                      motcle3 => {
                        idsmots.push(motcle3.id);
                        if(arrayMot.length>=4){
                          this.reportService.getMotCle(arrayMot[3]).subscribe(
                            motcle4 => {
                              idsmots.push(motcle4.id);
                              if(arrayMot.length==5){
                                this.reportService.getMotCle(arrayMot[4]).subscribe(
                                  motcle5 => {
                                    idsmots.push(motcle5.id);
                                    const object = {
                                      fk_etudiant: this.report.fk_etudiant,
                                      jurys:this.Jurys(),
                                      mots:idsmots
                                    }
                                    this.reportService.updateMotsClesJury(response.id,object).subscribe(
                                      response => {
                                        //console.log(response);
                                        this.submitted = true;
                                        this.hideSpinner=true;
                                    });
                                  }
                                );
                              }else{
                                const object = {
                                  fk_etudiant: this.report.fk_etudiant,
                                  jurys:this.Jurys(),
                                  mots:idsmots
                                }
                                this.reportService.updateMotsClesJury(response.id,object).subscribe(
                                  response => {
                                    //console.log(response);
                                    this.submitted = true;
                                    this.hideSpinner=true;
                                });
                               }
                            }
                          );
                        }else{
                          const object = {
                            fk_etudiant: this.report.fk_etudiant,
                            jurys:this.Jurys(),
                            mots:idsmots
                          }
                          this.reportService.updateMotsClesJury(response.id,object).subscribe(
                            response => {
                              //console.log(response);
                              this.submitted = true;
                              this.hideSpinner=true;
                          });
                         }
                      }
                    );
                  }
                );
              }
            );        
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
      this.report.details_add_societe='';
      this.report.parrain='';
      this.report.email_parrain='';
      this.report.telephone_parrain='';
      this.stageDisabled=true;
      this.report.pays_societe='';
      this.report.ville_societe='';
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
  
  public CanAddReport(){
    this.myFormService.get(1).subscribe(
      data => {
        //console.log("form:",data)
        this.DBreportForm = data;
        this.canAddReport = this.DBreportForm.active_status;
      },
      error => {
        console.log(error);
      });
  }

  public addJurys(){
    if(this.jury3===false){
      this.jury3=true;
    }
    else if(this.jury3===true){
      this.jury4=true;
      this.addJury=false;
    }
  }

  public Jurys(): Number[] {
    let array=[];
    for(var i = 0; i < 4; i++){ 
      if (!!this.alljurys[i]){
        array.push(this.alljurys[i])
      } 
    }
    return array;
  }

  public addmots(){
    if(this.mot4===false){
      this.mot4=true;
    }
    else if(this.mot4===true){
      this.mot5=true;
      this.addmot=false;
    }
  }

  public mots(): String[] {
    let array=[];
    for(var i = 0; i < 5; i++){ 
      if (!!this.allmots[i]){
        array.push(this.allmots[i])
      } 
    }
    return array;
  }
  

}
