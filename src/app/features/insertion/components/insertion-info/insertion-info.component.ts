import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insertion-info',
  templateUrl: './insertion-info.component.html',
  styleUrls: ['./insertion-info.component.css']
})
export class InsertionInfoComponent implements OnInit {
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
    fk_etudiant : {},
  }
  message = '';

  constructor(
    private insertionService: InsertionService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.message = '';
    //var id=this.route.snapshot.params.id;
    //console.log(id);
    this.getInsertion(this.route.snapshot.params.id);
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

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

}
