import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { Student } from 'src/app/features/student/models/student';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { StudentService } from 'src/app/features/student/services/student.service';
import { CountryCities } from 'src/app/shared/models/country-cities';
import { Country, State, City }  from 'country-state-city';
 

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
     countryList: Array<CountryCities>=[];

    cities: Array<any>;
    // autrePays_societe="";
    autreVille_societe="";
    // otherCountryHidden=true;
    otherCityHidden=true; 

  constructor(
    private insertionService: InsertionService,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private studentService: StudentService
   ) { }

  ngOnInit(): void {
    this.initiateCoutriesCities()

    this.message = '';
    this.getInsertion(this.route.snapshot.params.id);
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      var user_id = this.currentUser.id;
      this.getStudent(user_id);
    }
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

  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

  changeCity(city){
    if(city =="Autre"){
      this.currentInsertion.ville="Autre"
      this.otherCityHidden=false;
    }else{
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
          if(!this.cities.includes(this.currentInsertion.ville)){
            this.autreVille_societe= this.currentInsertion.ville.toString();
            this.changeCity("Autre");
          }
          console.log(data);
        },
        error => {
          console.log(error);
        });
    
  }

  updateInsertion(): void {
    this.hideSpinner=false;
    if(this.currentInsertion.ville=="Autre"){
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
