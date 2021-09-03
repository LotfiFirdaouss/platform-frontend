import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';

@Component({
  selector: 'app-insertions-list',
  templateUrl: './insertions-list.component.html',
  styleUrls: ['./insertions-list.component.css']
})
export class InsertionsListComponent implements OnInit {
  insertions?: Insertion[];
  currentInsertion?: Insertion;
  currentIndex = -1;

  //for pagination
  p: number = 1;

  //filters
  filterEtudiant:'';
  filterPromotion:'';
  selectFiliere:'';
  selectedInsertionType:'';
  villeInsertionFilter:'';
  paysInsertionFilter:'';
  posteFilter:'';
  SocieteFilter:'';
  universiteFilter:'';
  natureFormationFilter:'';
  intituleFormationFilter:'';


  constructor(private insertionService: InsertionService) { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/insertions/insertions-list.js");  
    this.showSpinner();
    this.retrieveInsertions();
  }

  retrieveInsertions(): void {
    this.insertionService.getAll()
      .subscribe(
        data => {
          this.insertions = data;
          console.log(data);
          this.hideSpinner();
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveInsertions();
    this.currentInsertion = undefined;
    this.currentIndex = -1;
  }

  setActiveInsertion(insertion: Insertion, index: number): void {
    this.currentInsertion = insertion;
    this.currentIndex = index;
  }
  
  removeAllInsertions(): void {
    this.insertionService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
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

  showSpinner(){
    var spinner = <HTMLElement> document.getElementsByTagName("app-spinner")[0];
    spinner.classList.replace("hidden","visible");
  }

  hideSpinner(){
    var spinner = <HTMLElement> document.getElementsByTagName("app-spinner")[0];
    spinner.classList.replace("visible","hidden");
  }

  renitialiserFiltres(){
    this.filterEtudiant='';
    this.filterPromotion='';
    this.selectFiliere='';
    this.selectedInsertionType='';
    this.villeInsertionFilter='';
    this.paysInsertionFilter='';
    this.posteFilter='';
    this.SocieteFilter='';
    this.universiteFilter='';
    this.natureFormationFilter='';
    this.intituleFormationFilter='';

    var advancedSearch =<HTMLDivElement> document.getElementsByName("advancedSearch")[0];
    var arrowUp = <HTMLDivElement> document.getElementsByName("arrow-up")[0];
    var arrowDown = <HTMLDivElement> document.getElementsByName("arrow-down")[0];
    var TravailFilters =<HTMLDivElement> document.getElementsByName("TravailFilters")[0];
    var EtudeFilters =<HTMLDivElement> document.getElementsByName("EtudeFilters")[0];
    
    if( advancedSearch.classList.contains("visible")){
      advancedSearch.classList.replace("visible","hidden");
      EtudeFilters.classList.replace("visible","hidden");
      TravailFilters.classList.replace("visible","hidden");
      arrowUp.classList.replace("visibleArrow","hidden");
      arrowDown.classList.replace("hidden","visibleArrow");
    }
  }

  ShowHideAdvancedSearch(){
    var advancedSearch =<HTMLDivElement> document.getElementsByName("advancedSearch")[0];
    var TravailFilters =<HTMLDivElement> document.getElementsByName("TravailFilters")[0];
    var EtudeFilters =<HTMLDivElement> document.getElementsByName("EtudeFilters")[0];
    var arrowUp = <HTMLDivElement> document.getElementsByName("arrow-up")[0];
    var arrowDown = <HTMLDivElement> document.getElementsByName("arrow-down")[0];
    if( advancedSearch.classList.contains("hidden")){
      advancedSearch.classList.replace("hidden","visible");
      arrowUp.classList.replace("hidden","visibleArrow");
      arrowDown.classList.replace("visibleArrow","hidden");
      if( this.selectedInsertionType?.toString() == "travail"){
        TravailFilters.classList.replace("hidden","visible");
      }else if( this.selectedInsertionType?.toString() == "etude" ){
        EtudeFilters.classList.replace("hidden","visible");
      }
    }else{
      advancedSearch.classList.replace("visible","hidden");
      EtudeFilters.classList.replace("visible","hidden");
      TravailFilters.classList.replace("visible","hidden");
      arrowUp.classList.replace("visibleArrow","hidden");
      arrowDown.classList.replace("hidden","visibleArrow");
    }
  }

  ShowHideTravailEtudeFilters(){
    var TravailFilters =<HTMLDivElement> document.getElementsByName("TravailFilters")[0];
    var EtudeFilters =<HTMLDivElement> document.getElementsByName("EtudeFilters")[0];
    if( this.selectedInsertionType?.toString() == "travail"){
      TravailFilters.classList.replace("hidden","visible");
      EtudeFilters.classList.replace("visible","hidden");
    }else if( this.selectedInsertionType?.toString() == "etude" ){
      TravailFilters.classList.replace("visible","hidden");
      EtudeFilters.classList.replace("hidden","visible");
    }
  }
  
}
