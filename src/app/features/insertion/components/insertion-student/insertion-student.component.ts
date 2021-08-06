import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insertion-student',
  templateUrl: './insertion-student.component.html',
  styleUrls: ['./insertion-student.component.css']
})
export class InsertionStudentComponent implements OnInit {
  insertions?: Insertion[];
  currentInsertion?: Insertion;
  currentIndex = -1;

  constructor(
    private insertionService: InsertionService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    var id=this.route.snapshot.params.etudiant;
    console.log(id);
    this.getInsertion(this.route.snapshot.params.etudiant);
  }

  getInsertion(id_etudiant: number): void {
    this.insertionService.findByStudent(id_etudiant)
      .subscribe(
        data => {
          this.insertions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveInsertion(insertion: Insertion, index: number): void {
    this.currentInsertion = insertion;
    this.currentIndex = index;
  }

}


