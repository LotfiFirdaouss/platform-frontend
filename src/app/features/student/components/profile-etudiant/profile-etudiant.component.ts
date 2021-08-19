import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-profile-etudiant',
  templateUrl: './profile-etudiant.component.html',
  styleUrls: ['./profile-etudiant.component.css']
})
export class ProfileEtudiantComponent implements OnInit {
  currentStudent : Student;
  isUser = false;
  
  constructor( private studentService : StudentService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    var student_id = this.route.snapshot.params.id;
    this.getStudent(student_id);
    //console.log(this.currentStudent);
  }

  getStudent(id: String): void {
    this.studentService.get(id)
      .subscribe(
        data => {
          this.currentStudent = data;
          if(data.fk_user.id){
            this.isUser=true;
          }
          //console.log(this.isUser)
        },
        error => {
          console.log(error);
        });
  }

}
