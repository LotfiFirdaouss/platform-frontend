import { Component, OnInit } from '@angular/core';
import { Insertion } from 'src/app/features/insertion/models/insertion.model';
import { InsertionService } from 'src/app/features/insertion/services/insertion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/features/student/models/student';
import { StudentService } from 'src/app/features/student/services/student.service';

@Component({
  selector: 'app-insertion-student',
  templateUrl: './insertion-student.component.html',
  styleUrls: ['./insertion-student.component.css']
})
export class InsertionStudentComponent implements OnInit {
  insertions?: Insertion[];
  currentInsertion?: Insertion;
  currentIndex = -1;
  //currentStudent !: Student;

  constructor(
    private insertionService: InsertionService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    ) { }

  ngOnInit(): void {
    var student_id=this.route.snapshot.params.etudiant;
    this.getInsertion(student_id);
    //this.getStudent(student_id);
  }

  // getStudent(id_etudiant: number): void {
  //   this.studentService.get(id_etudiant)
  //     .subscribe(
  //       data => {
  //         this.currentStudent = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }  

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


