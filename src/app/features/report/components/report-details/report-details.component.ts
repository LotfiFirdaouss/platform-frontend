import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Professor } from 'src/app/features/professor/models/professor';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { MotCle } from '../../models/mot-cle';
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
   parrain: '',
   email_parrain: '',
   telephone_parrain: '',
   rapport_confidentiel: false,
   fk_etudiant: 1,
   type_rapport:'Initiation',
   resume_rapport:'',
   fk_encadrant_univ:null,
 };

  alljurys=[];
  jury3=false;
  jury4=false;
  addJury=true;

  //Mot clé
  allmots=[];
  mot4=false;
  mot5=false;
  addmot=true;

 natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
 types_rapport : String[] = ['Initiation','PFA','PFE']
 stageDisabled=false;
 Updated= false;
 fileToUpload: File | null = null;
 
 professeurs : Professor[];


   //for cities and countries
   countryList: Array<any> = [
    { name: 'Maroc', cities: [
      "Afourar",
"Agadir",
"Aghbala",
"Aghbalou",
"Agdz",
"Agouraï",
"Aguelmous",
"Ahfir",
"Aïn Leuh",
"Aïn Bni Mathar",
"Ain Cheggag",
"Aïn Dorij",
"Aïn El Aouda",
"Aïn Erreggada",
"Aïn Harrouda",
"Aïn Jemaa",
"Aïn Karma",
"Aïn Taoujdate",
"Aït Iaaza",
"Aït Baha",
"Aït Boubidmane",
"Aït Daoud",
"Aït Ishaq",
"Aït Melloul",
"Aït Ourir", 
"Akka",
"Aklim",
"Aknoul",
"Ajdir",
"Al Aaroui", 
"Al Hoceïma",
"Alnif",
"Amalou Ighriben",
"Amizmiz",
"Aoufous",
"Aoulouz",
"Aourir",
"Arbaoua",
"Arfoud",
"Assa",
"Assahrij",
"Assilah",
"Azemmour",
"Azilal",
"Azrou",
"Bab Berred",
"Bab Taza",
"Bejaad",
"Ben Ahmed",
"Ben Guerir",
"Ben Taïeb",
"Ben Yakhlef",
"Beni Mellal",
"Ben Slimane",
"Berkane",
"Berrechid",
"Bhalil",
"Biougra",
"Bni Ansar", 
"Bni Bouayach", 
"Bni Chiker",
"Bni Drar",
"Bni Hadifa",
"Bni Tadjite",
"Bouanane",
"Bouarfa",
"Boudnib",
"Bouguedra",
"Bouhdila",
"Bouizakarne",
"Boujdour",
"Boujniba",
"Boulanouare",
"Boulemane",
"Boumalne Dadès",
"Boumia",
"Bouskoura",
"Bouznika",
"Bradia",
"Brikcha",
"Bzou",
"Casablanca",
"Chefchaouen",
"Chichaoua",
"Dakhla",
"Dar Bni Karrich",
"Dar Chaoui",
"Dar El Kebdani",
"Dar Gueddari",
"Dar Ould Zidouh",
"Dcheïra El Jihadia",
"Debdou",
"Demnate",
"Deroua",
"Drargua",
"Driouch",
"Echemmaia",
"El Aïoun Sidi Mellouk",
"El Borouj",
"El Gara",
"El Hajeb",
"El Hanchan",
"El Jadida",
"El Kba",
"El Kelaa des Mgouna",
"El Kelaa des Sraghna",
"El Ksiba",
"El Mansouri",
"El Marsa",
"El Menzel",
"El Ouati",
"Erfoud",
"Errachidia",
"Er-Rich",
"Essaouira",
"Es-Semara",
"Fam El Hisn",
"Farkhana",
"Fès",
"Figuig", 
"Fnideq",
"Foum Jamaa",
"Foum Zguid",
"Fquih Ben Salah",
"Ghafsaï",
"Ghmate",
"Goulmima",
"Gourrama",
"Guelmim",
"Guercif",
"Gueznaïa",
"Guigou",
"Guisse",
"Had Bouhssoussen",
"Had Kourt",
"Had Oued Ifrane",
"Haj Kaddour",
"Hattane",
"Houara",
"Ifrane Atlas Saghir",
"Ifrane",
"Ighoud",
"Ihddaden",
"Imouzzer Marmoucha",
"Imzouren",
"Inezgane",
"Irherm",
"Issaguen",
"Itzer",
"Jaadar",
"Jamaat Shaim", 
"Jebha",
"Jerada",
"Jorf",
"Jorf El Melha",
"Kalaat M'Gouna",
"Karia",
"Karia",
"Karia Ba Mohamed", 
"Kariat Arekmane",
"Kasba Tadla",
"Kassita",
"Kattara",
"Kehf Nsour",
"Kénitra",
"Kerouna",
"Kerrouchen",
"Khémis Sahel",
"Khémisset",
"Khénifra",
"Khénichet",
"Khouribga",
"Ksar El Kébir",
"Laâounate",
"Laakarta",
"Laattaouia", 
"Laayoune",
"Lagouira",
"Lakhsas",
"Lahraouyine", 
"Lalla Mimouna", 
"Lalla Takarkoust",
"Larache",
"Lakouabl",
"Lbir Jdid",
"Loualidia",
"Loulad",
"Lqliaa",
"Maaziz",
"Madagh",
"Marrakech",
"Martil",
"Massa",
"Matmata", 
"M'Diq",
"Médiouna",
"Mechra Bel Ksiri", 
"Mehdya",
"Meknès",
"M'Haya",
"Midar",
"Midelt",
"Missour",
"Mohammédia",
"Moqrisset",
"Moulay Abdallah",
"Moulay Ali Chérif", 
"Moulay Bouazza",
"Moulay Bousselham",
"Moulay Brahim",
"Moulay Driss Zerhoun", 
"M'Rirt",
"Nador",
"Naïma",
"Nouaceur",
"Oualidia",
"Ouaouizeght",
"Ouarzazate",
"Oued Heïmer",
"Oued Laou",
"Oued Zem",
"Ouezzane",
"Ouislane",
"Oujda",
"Oulad Abbou", 
"Oulad Amrane",
"Oulad Ayad",
"Oulad Berhil", 
"Oulad Frej",
"Oulad Ghadbane",
"Oulad",
"Oulad M'Barek",
"Oulad Mrah",
"Oulad Saïd",
"Oulad Tayeb",
"Oulad Teïma",
"Oulad Yaïch",
"Oulad Zbaïr",
"Oulmès",
"Oum El Guerdane",
"Ounag",
"Outat El Haj",
"Rabat",
"Ras El Aïn",
"Ras El Ma",
"Ribate El Kheïr",
"Rissani",
"Rommani",
"Sabaa Aiyoun", 
"Safi",
"Saïdia",
"Salé",
"Sebt El Guerdane",
"Sebt El Maarif",
"Sebt Gzoula",
"Sebt Jahjouh",
"Sefrou",
"Selouane",
"Semara",
"Settat",
"Sid L'Mokhtar",
"Sid Zouin",
"Sidi Abdallah Ghiat",
"Sidi Addi",
"Sidi Ahmed",
"Sidi Ali Ban Hamdouche",
"Sidi Allal El Bahraoui",
"Sidi Allal Tazi",
"Sidi Bennour",
"Sidi Bou Othmane",
"Sidi Boubker",
"Sidi Bouknadel",
"Sidi Bouzid",
"Sidi Kacem",
"Sidi Hajjaj Oulad Mrah",
"Sidi Ifni",
"Sidi Jaber",
"Sidi Lyamani",
"Sidi Rahhal",
"Sidi Rahhal Chataï",
"Sidi Slimane",
"Sidi Slimane Echcharraa",
"Sidi Smaïl",
"Sidi Taïb",
"Sidi Yahya El Gharb",
"Skhirate",
"Skhour Rehamna",
"Skoura",
"Smara",
"Smimou",
"Soualem",
"Souk El Arbaâ",
"Souk Sebt Oulad Nemma",
"Tabounte",
"Tafetachte",
"Tafraout",
"Tafrisset",
"Taghjijt",
"Tahannaout",
"Tahla",
"Taïnaste",
"Talmest",
"Taliouine",
"Talsint",
"Tamallalt", 
"Tamanar",
"Tamassint",
"Tameslouht",
"Tanger",
"Tan-Tan",
"Taounate",
"Tarfaya",
"Targuist",
"Taourirt",
"Taroudant",
"Tata",
"Taza",
"Taznakht",
"Témara",
"Temsia",
"Tendrara",
"Tétouan",
"Thar Es Souk",
"Tidass",
"Tiflet",
"Tighassaline",
"Tighza",
"Timahdite",
"Tinejdad",
"Tit Mellil",
"Tizi Ouasli",
"Tiznit",
"Tiztoutine",
"Touima",
"Touissit",
"Toulal",
"Tounfite",
"Youssoufia",
"Zag",
"Zagora",
"Zaïda",
"Zaïo",
"Zaouïat Bougrine",
"Zaouïat Cheikh",
"Zeghanghane",
"Zemamra",
"Zirara",
"Zoumi",
"Zrarda",
    ] },
    { name: 'France', cities: [
      "Paris",
"Marseille",
"Lyon",
"Toulouse",
"Nice",
"Nantes",
"Strasbourg",
"Montpellier",
"Bordeaux",
"Lille",
"Rennes",
"Reims",
"Le Havre",
"Saint-Étienne",
"Toulon",
"Grenoble",
"Angers",
"Dijon",
"Brest",
"Le Mans",
"Nîmes",
"Aix-en-Provence",
"Clermont-Ferrand",
"Tours",
"Amiens",
"Limoges",
"Villeurbanne",
"Metz",
"Besançon",
"Perpignan",
"Orléans",
"Caen",
"Mulhouse",
"Boulogne-Billancourt",
"Rouen",
"Nancy",
"Argenteuil",
"Montreuil",
"Saint-Denis",
"Roubaix",
"Avignon",
"Tourcoing",
"Poitiers",
"Nanterre",
"Créteil",
"Versailles",
"Pau",
"Courbevoie",
"Vitry-sur-Seine",
"Asnières-sur-Seine",
"Colombes",
"Aulnay-sous-Bois",
"La Rochelle",
"Rueil-Malmaison",
"Antibes",
"Saint-Maur-des-Fossés",
"Calais",
"Champigny-sur-Marne",
"Aubervilliers",
"Béziers",
"Bourges",
"Cannes",
"Saint-Nazaire",
"Dunkerque",
"Quimper",
"Valence",
"Colmar",
"Drancy",
"Mérignac",
"Ajaccio",
"Levallois-Perret",
"Troyes",
"Neuilly-sur-Seine",
"Issy-les-Moulineaux",
"Villeneuve-d'Ascq",
"Noisy-le-Grand",
"Antony",
"Niort",
"Lorient",
"Sarcelles",
"Chambéry",
"Saint-Quentin",
"Pessac",
"Vénissieux",
"Cergy",
"La Seyne-sur-Mer",
"Clichy",
"Beauvais",
"Cholet",
"Hyères",
"Ivry-sur-Seine",
"Montauban",
"Vannes",
"La Roche-sur-Yon",
"Charleville-Mézières",
"Pantin",
"Laval",
"Maisons-Alfort",
"Bondy",
"Évry",

    ] },
    { name: 'Autre', cities: ['Autre'] },
  ];
  cities: Array<any>;
  autrePays_societe="";
  autreVille_societe="";
  otherCountryHidden=true;
  otherCityHidden=true; 
  encadrant_univ="";

  //file validation
  fileSizeError=false;
  fileTypeError=false;
  
  hideSpinner=true;

  /* the form reference */
  @ViewChild('reportForm') reportForm: NgForm;
  professors?: Professor[];

 constructor(private reportService: ReportService,
   private route: ActivatedRoute,
   private professorService : ProfessorService) { }
      
 ngOnInit(): void {
  this.retrieveProfessor();
   this.getReport(this.route.snapshot.params.id); 
   this.retreiveProfessors();

 }

 retreiveProfessors(){
  this.professorService.getAll().subscribe(
    data => {
      this.professeurs = data;
    },
    error => {
      console.log(error);
    }
  );
}

 changeCountry(count) {
  this.cities = this.countryList.find(con => con.name == count).cities;
  if( count == "Maroc"){ this.currentReport.ville_societe="Casablanca" }
  if( count == "France"){ this.currentReport.ville_societe="Paris" }
  if( count == "Autre"){ this.currentReport.ville_societe="Autre" }
  if(count =="Autre"){
    this.otherCountryHidden=false;
    this.otherCityHidden=false;
  }else{
    this.otherCountryHidden=true;
    this.otherCityHidden=true;
  }
}

 handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
  var size = this.fileToUpload.size/1000;
    
  //setting the errors
  size > 2000 ? this.fileSizeError=true : this.fileSizeError=false;
  this.fileToUpload.type!="application/pdf" ? this.fileTypeError=true : this.fileTypeError=false;

  //setting the errors to be considered in form validation
  if(this.fileSizeError || this.fileTypeError){
    this.reportForm.form.controls['fichier_rapport'].setErrors({'incorrect': true});
  }else{
    this.reportForm.form.controls['fichier_rapport'].setErrors(null);
  }
}

 getReport(id: string): void {
   this.reportService.get(id)
     .subscribe(
       data => {
          this.currentReport = data;
          //console.log(data.stage_ou_projet);
          if(!data.stage_ou_projet){
            //projet
            //console.log("projet")
            this.stageDisabled=true;
          }else{
            //Stage
            //console.log("stage")
            this.stageDisabled=false;
            //console.log(data.pays_societe)
            //to handle autre pays/ville
            if(this.currentReport.pays_societe!= "Maroc" && this.currentReport.pays_societe!="France" && this.currentReport.pays_societe!=""){
              this.autrePays_societe= this.currentReport.pays_societe?.toString();
              this.autreVille_societe= this.currentReport.ville_societe?.toString();
              this.currentReport.pays_societe="Autre";
              this.changeCountry("Autre");
            }else{
              this.cities = this.countryList.find(con => con.name == data.pays_societe)?.cities;
            }            
          }
          //mots
          this.getMots(data);

          //jurys
          this.getJurys(data);
          // console.log(this.currentReport.fk_encadrant_univ)

       },
       error => {
         //console.log(error);
       });
 }

 updateReport(): void {
  this.hideSpinner=false;
  if(this.currentReport.pays_societe=="Autre"){
    this.currentReport.pays_societe = this.autrePays_societe;
    this.currentReport.ville_societe = this.autreVille_societe;
  }
  let data = {
    stage_ou_projet: this.currentReport.stage_ou_projet,
    date_debut_stage: this.currentReport.date_debut_stage,
    date_fin_stage: this.currentReport.date_fin_stage,
    intitule_stage: this.currentReport.intitule_stage,
    societe_stage: this.currentReport.societe_stage,
    secteur_societe: this.currentReport.secteur_societe,
    ville_societe: this.currentReport.ville_societe,
    pays_societe: this.currentReport.pays_societe,
    details_add_societe: this.currentReport.details_add_societe,
    parrain: this.currentReport.parrain,
    email_parrain: this.currentReport.email_parrain,
    telephone_parrain: this.currentReport.telephone_parrain,
    //fichier_rapport: (this.fileToUpload),
    rapport_confidentiel: this.currentReport.rapport_confidentiel,
    fk_etudiant: this.currentReport.fk_etudiant.id,
    type_rapport:this.currentReport.type_rapport,
    resume_rapport:this.currentReport.resume_rapport,
    valid_admin:this.currentReport.valid_admin,
    valid_encadrant:this.currentReport.valid_encadrant,
  };
  if(this.currentReport.type_rapport=="PFE"){
    data['fk_encadrant_univ']=this.currentReport.fk_encadrant_univ;
  }else{
    data['fk_encadrant_univ']="";
  }
  //console.log("DATAAAAA",data)

  if(this.fileToUpload!=null){
    //console.log('with file')
    data['fichier_rapport']=this.fileToUpload;
  }else{
    //console.log("with no file")
  }
  //console.log("data sent to update",data)

  let arrayMot = this.mots();
  //post the new words
  this.reportService.postMotsClés(arrayMot);

  this.reportService.update(this.currentReport.id, data)
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
                                   fk_etudiant: this.currentReport.fk_etudiant.id,
                                   jurys:this.Jurys(),
                                   mots:idsmots
                                 }
                                 this.reportService.updateMotsClesJury(response.id,object).subscribe(
                                   response => {
                                     //console.log(response);
                                     this.Updated = true;
                                     this.hideSpinner=true;
                                 });
                               }
                             );
                           }
                           else {
                            const object = {
                              fk_etudiant: this.currentReport.fk_etudiant.id,
                              jurys:this.Jurys(),
                              mots:idsmots
                            }
                            this.reportService.updateMotsClesJury(response.id,object).subscribe(
                              response => {
                                //console.log(response);
                                this.Updated = true;
                                this.hideSpinner=true;
                            });
                           }
                         }
                       );
                     }else{
                      const object = {
                        fk_etudiant: this.currentReport.fk_etudiant.id,
                        jurys:this.Jurys(),
                        mots:idsmots
                      }
                      this.reportService.updateMotsClesJury(response.id,object).subscribe(
                        response => {
                          //console.log(response);
                          this.Updated = true;
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
     //projet
     this.currentReport.societe_stage='';
     this.currentReport.secteur_societe='';
     this.currentReport.ville_societe='';
     this.currentReport.pays_societe='';
     this.currentReport.details_add_societe='';
     this.currentReport.parrain='';
     this.currentReport.email_parrain='';
     this.currentReport.telephone_parrain='';
     this.stageDisabled=true;
   }else{
     //stage
     this.stageDisabled=false;
     this.currentReport.pays_societe='Maroc';
     this.changeCountry("Maroc");
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

 public retrieveProfessor(): void {
  this.professorService.getAll().subscribe( data => {this.professors = data;});
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
    if (this.alljurys[i]!=0){
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

public getJurys(data:Report){
  this.alljurys[0]=data.jurys[0];
  this.alljurys[1]=data.jurys[1];
  this.alljurys[2]=this.alljurys[3]=0;
  if(data.jurys.length>=3){
    this.alljurys[2]=data.jurys[2];
    this.jury3=true;
  }
  if(data.jurys.length==4){
    this.alljurys[3]=data.jurys[3];
    this.jury4=true;
    this.addJury=false;
  }
}

public getMots(data:Report){
  this.allmots[4]=this.allmots[3]='';
  this.allmots[0]=data.mots[0].mot ;
  this.allmots[1]=data.mots[1].mot;
  this.allmots[2]=data.mots[2].mot;
  if(data.mots.length>=4){
    this.allmots[3]=data.mots[3].mot;
    this.mot4=true;
  }
  if(data.mots.length==5){
    this.allmots[4]=data.mots[4].mot;
    this.mot5=true;
    this.addmot=false;
  }
}
 

}