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
  
}
