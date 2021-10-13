import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { MyFormService } from 'src/app/features/administrator/services/my-form.service';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';
import { Country, State, City }  from 'country-state-city';
import { CountryCities } from 'src/app/shared/models/country-cities';


@Component({
  selector: 'app-add-insertion',
  templateUrl: './add-insertion.component.html',
  styleUrls: ['./add-insertion.component.css']
})
export class AddInsertionComponent implements OnInit {
  insertion : Insertion = {
    cursus_post_ensam: 'travail',
    univ : '',
    pays : 'Morocco',   
    nature_formation : '',
    intit_formation : '',
    intit_poste : '',
    societe : '',
    ville : 'Casablanca',
    date_integration: null, //YYYY-MM-DD
    fk_etudiant : 0,
  }
  submitted = false;
  clicked=false;
  etudeDisabled=true;
  travailDisabled=false;

  //to get value of student_id
  isLoggedIn = false;
  currentUser!: ReturnedUser;
  currentStudent!: Student;

  canAddInsertion=true;
  insertionForm={
    "id": 0,
    "nom_form": '',
    "active_status": true
  }

    //for cities and countries
    countryList: Array<CountryCities>=[];

    cities: Array<any>;
    // autrePays_societe="";
    // autreVille_societe="";
    // otherCountryHidden=true;
    // otherCityHidden=true; 

    hideSpinner=true;

  constructor(private insertionService : InsertionService,
    private token: TokenStorageService,
    private studentService: StudentService,
    private myFormService: MyFormService) { }

  ngOnInit(): void {
    // console.log(Country.getAllCountries())
    // console.log(City.getAllCities())
    this.initiateCoutriesCities()
    this.isLoggedIn = !!this.token.getToken();
    //console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      var user_id = this.currentUser.id;
      this.getStudent(user_id);
    }  
    this.CanAddInsertion();
    this.cities = this.countryList.find(con => con.name == this.insertion.pays).cities;

  }

  initiateCoutriesCities(){
    // for(var country of Country.getAllCountries()){
    //   console.log("country",country.name);
    //   console.log("its cities",City.getCitiesOfCountry(country.isoCode))
    // }    
    
    for(var country of Country.getAllCountries()){
      let citiesOfCoutry=[]
      for(let city of  City.getCitiesOfCountry(country.isoCode)){
        citiesOfCoutry.push(city.name);
      } 
      this.countryList.push({
        "name":country.name,
        "cities":citiesOfCoutry
      })

    }

  }

  getStudent(id_user: number): void {
    this.studentService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentStudent = data[0];
          this.insertion.fk_etudiant= this.currentStudent.id;
          this.insertionService.findByStudent(this.currentStudent.id)
          .subscribe(
            data => {
              // console.log(data[0])
              if(data[0]){
                console.log("you already added insertion")
                this.canAddInsertion=false;
              }
            },
            error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
        });
  }

  changeCountry(count) {
    // console.log(count)
    // console.log(this.insertion.pays)
    this.cities = this.countryList.find(con => con.name == count).cities;
    // if(count =="Autre"){
    //   this.otherCountryHidden=false;
    //   this.otherCityHidden=false;
    // }else{
    //   this.otherCountryHidden=true;
    //   this.otherCityHidden=true;
    // }
  }

  saveInsertion(): void {
    this.hideSpinner=false;
    // if(this.insertion.pays=="Autre"){
    //   this.insertion.pays = this.autrePays_societe;
    //   this.insertion.ville = this.autreVille_societe;
    // }
    const data = {
      horodateur:this.getCurrentDate(),
      cursus_post_ensam: this.insertion.cursus_post_ensam,
      univ : this.insertion.univ,
      pays : this.insertion.pays,
      nature_formation : this.insertion.nature_formation,
      intit_formation : this.insertion.intit_formation,
      intit_poste : this.insertion.intit_poste,
      societe : this.insertion.societe,
      ville : this.insertion.ville,
      date_integration: this.insertion.date_integration,
      fk_etudiant : this.insertion.fk_etudiant
    };

    this.insertionService.create(data)
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

  getCurrentDate(): any {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy+'-'+mm+'-'+dd;
  }


  newInsertion(): void {
    this.submitted = false;
    this.insertion = {
      cursus_post_ensam: 'travail',
      univ : '',
      pays : '',    
      nature_formation : '',
      intit_formation : '',
      intit_poste : '',
      societe : '',
      ville : '',
      date_integration: null, 
      fk_etudiant : 0,
    };
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
  }else{
      elements = document.getElementsByClassName('travailClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
      }
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

  public CanAddInsertion(){
    this.myFormService.get(2).subscribe(
      data => {
        // console.log("form:",data)
        this.insertionForm = data;
        this.canAddInsertion = this.insertionForm.active_status;
      },
      error => {
        console.log(error);
      });
  }

}
