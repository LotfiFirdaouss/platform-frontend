import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { MyFormService } from 'src/app/features/administrator/services/my-form.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
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
    ville_societe: 'Casablanca',
    pays_societe: 'Maroc',
    details_add_societe: '',
    encadrant: '',
    email_encadrant: '',
    telephone_encadrant: '',
    fichier_rapport: null,
    rapport_confidentiel: false,
    fk_etudiant: 0,
    type_rapport:'Initiation',
    resume_rapport:'' 
  };

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


  constructor(private reportService: ReportService,
    private token: TokenStorageService,
    private studentService: StudentService,
    private myFormService : MyFormService) { }

  ngOnInit(): void {
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
    console.log(count)
    console.log(this.report.pays_societe)
    this.cities = this.countryList.find(con => con.name == count).cities;
    if( count == "Maroc"){ this.report.ville_societe="Casablanca" }
    if( count == "France"){ this.report.ville_societe="Paris" }
    if( count == "Autre"){ this.report.ville_societe="Autre" }
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
    //console.log(size.toString()+"kb")
    //console.log(this.fileToUpload.type)
  }

  saveReport(): void {
    this.hideSpinner=false;
    if(this.report.pays_societe=="Autre"){
      this.report.pays_societe = this.autrePays_societe;
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
      encadrant: this.report.encadrant,
      email_encadrant: this.report.email_encadrant,
      telephone_encadrant: this.report.telephone_encadrant,
      fichier_rapport: (this.fileToUpload),
      rapport_confidentiel: this.report.rapport_confidentiel,
      fk_etudiant: this.report.fk_etudiant,
      type_rapport:this.report.type_rapport,
      resume_rapport:this.report.resume_rapport,
    };

    this.reportService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.hideSpinner=true;
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
      this.report.encadrant='';
      this.report.email_encadrant='';
      this.report.telephone_encadrant='';
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
        console.log("form:",data)
        this.DBreportForm = data;
        this.canAddReport = this.DBreportForm.active_status;
      },
      error => {
        console.log(error);
      });
  }


}
