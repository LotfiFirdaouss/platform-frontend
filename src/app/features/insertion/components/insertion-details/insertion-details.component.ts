import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private insertionService: InsertionService,
    private route: ActivatedRoute,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.message = '';
    this.getInsertion(this.route.snapshot.params.id);
    this.loadJsFile("../../../../assets/js/insertions/insertion-details.js");  
  }

  getInsertion(id: string): void {
    this.insertionService.get(id)
      .subscribe(
        data => {
          this.currentInsertion = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    
  }

  updateInsertion(): void {
    this.insertionService.update(this.currentInsertion.id, this.currentInsertion)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.updated = true;
        },
        error => {
          console.log(error);
        });
  }

  deleteInsertion(): void {
    this.insertionService.delete(this.currentInsertion.id)
      .subscribe(
        response => {
          console.log(response);
          //this.router.navigate(['/insertions']);
          this.deleted = true;
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

  onCursus(){
    //recuperer la valeur de cursus
    var cursus= <HTMLInputElement> document.getElementById("cursus_post_ensam");
    var cursus_value=cursus.value;

    var index;
    var elements;
    var count;
    var Element;
    //griller les champs correspondants
    if(cursus_value=="travail"){
      elements = document.getElementsByClassName('etudeClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
        Element.disabled = true;
      }

      elements = document.getElementsByClassName('travailClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.disabled = false;
      }

  }else{
      elements = document.getElementsByClassName('travailClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.value="";
        Element.disabled = true;
      }

      elements = document.getElementsByClassName('etudeClass');
      count = elements.length;
      for(index = 0; index < count; index++){
        Element = <HTMLInputElement> elements[index];
        Element.disabled = false;
      }
  }


/*    var index;
    var elements = document.getElementsByClassName('etudeClass');
    console.log(elements)
    var count = elements.length;
    var Element;
  for(index = 0; index < count; index++){
    Element = <HTMLInputElement> elements[index];
    Element.disabled = true;
  }*/

  }
}