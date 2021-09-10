import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { Student } from 'src/app/features/student/models/student';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { StudentService } from 'src/app/features/student/services/student.service';

@Component({
  selector: 'app-insertion-details',
  templateUrl: './insertion-details.component.html',
  styleUrls: ['./insertion-details.component.css']
})
export class InsertionDetailsComponent implements OnInit {
  currentInsertion : Insertion = { 
    cursus_post_ensam: 'travail',
    univ : '',
    pays : '',    
    nature_formation : '',
    intit_formation : '',
    intit_poste : '',
    societe : '',
    ville : '',
    date_integration: new Date(), //YYYY-MM-DD
    fk_etudiant : 0,
  }
  message = '';
  updated=false;
  deleted=false;
  etudeDisabled=true;
  travailDisabled=false;

  //to get value of student_id
  isLoggedIn = false;
  currentUser!: ReturnedUser;
  currentStudent!: Student;

  hideSpinner=true;

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

  constructor(
    private insertionService: InsertionService,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private studentService: StudentService
   ) { }

  ngOnInit(): void {
    this.message = '';
    this.getInsertion(this.route.snapshot.params.id);
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      var user_id = this.currentUser.id;
      this.getStudent(user_id);
    }
  }

  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
    if( count == "Maroc"){ this.currentInsertion.ville="Casablanca" }
    if( count == "France"){ this.currentInsertion.ville="Paris" }
    if( count == "Autre"){ this.currentInsertion.ville="Autre" }
    if(count =="Autre"){
      this.otherCountryHidden=false;
      this.otherCityHidden=false;
    }else{
      this.otherCountryHidden=true;
      this.otherCityHidden=true;
    }
  }

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
          this.currentInsertion.fk_etudiant= this.currentStudent.id;
        },
        error => {
          console.log(error);
        });
  }

  getInsertion(id: string): void {
    this.insertionService.get(id)
      .subscribe(
        data => {
          if(data.cursus_post_ensam !="travail"){
            this.etudeDisabled=false;
            this.travailDisabled=true;
          }else{
            this.etudeDisabled=true;
            this.travailDisabled=false;
          }
          this.cities = this.countryList.find(con => con.name == data.pays)?.cities;
          this.currentInsertion = data;
          //to handle autre pays/ville
          if(this.currentInsertion.pays!= "Maroc" && this.currentInsertion.pays!="France" && this.currentInsertion.pays!=""){
            this.autrePays_societe= this.currentInsertion.pays.toString();
            this.autreVille_societe= this.currentInsertion.ville.toString();
            this.currentInsertion.pays="Autre";
            this.changeCountry("Autre");
          }  
          console.log(data);
        },
        error => {
          console.log(error);
        });
    
  }

  updateInsertion(): void {
    this.hideSpinner=false;
    if(this.currentInsertion.pays=="Autre"){
      this.currentInsertion.pays = this.autrePays_societe;
      this.currentInsertion.ville = this.autreVille_societe;
    }
    this.insertionService.update(this.currentInsertion.id, this.currentInsertion)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.updated = true;
          this.hideSpinner=true;
        },
        error => {
          console.log(error);
        });
  }

  deleteInsertion(): void {
    this.hideSpinner=false;
    this.insertionService.delete(this.currentInsertion.id)
      .subscribe(
        response => {
          console.log(response);
          //this.router.navigate(['/insertions']);
          this.deleted = true;
          this.hideSpinner=true;
        },
        error => {
          console.log(error);
        });
  }

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  myFunction(){
    this.onCursus();
    var cursus= <HTMLInputElement> document.getElementById("cursus_post_ensam");
    var cursus_value=cursus.value;
    if(cursus_value=="travail"){
      this.etudeDisabled=true;
      this.travailDisabled=false;
    }else{
      this.etudeDisabled=false;
      this.travailDisabled=true;
    }
  }

  onCursus(){
    //recuperer la valeur de cursus
    var cursus= <HTMLInputElement> document.getElementById("cursus_post_ensam");
    var cursus_value=cursus.value;

    var index,elements,count,Element;
    //renitialiser les valeurs
    if(cursus_value=="travail"){
      elements = document.getElementsByClassName('etudeClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
      }
      this.currentInsertion.intit_formation='';
      this.currentInsertion.nature_formation='';
      this.currentInsertion.univ='';
  }else{
      elements = document.getElementsByClassName('travailClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
      }
      this.currentInsertion.societe='';
      this.currentInsertion.intit_poste='';
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
