import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-insertion',
  templateUrl: './add-insertion.component.html',
  styleUrls: ['./add-insertion.component.css']
})
export class AddInsertionComponent implements OnInit {
  insertion : Insertion = {
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
  submitted = false;

  constructor(private insertionService : InsertionService) { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/insertions/add-insertion.js");  
  }

  saveInsertion(): void {
    const data = {
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
        },
        error => {
          console.log(error);
        });
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
      date_integration: new Date(), 
      fk_etudiant : 0,
    };
  }

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

}
