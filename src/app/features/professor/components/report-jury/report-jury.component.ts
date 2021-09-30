import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Report } from 'src/app/features/report/models/report';
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-report-jury',
  templateUrl: './report-jury.component.html',
  styleUrls: ['./report-jury.component.css']
})
export class ReportJuryComponent implements OnInit {

  isLoggedIn = false;
  currentUser!: ReturnedUser;
  currentProfessor: Professor;
  group="";

  //list of reports
  reports?: Report[];
  
  //For spinner
  hideSpinner = false;

  //for pagination
  p=1;
  
  //filters
  filterPromotion:'';
  selectFiliere:'';
  selectedReportType:"";
  dateFilter:"";
  
  constructor(private professorService: ProfessorService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();    
    var user_id;
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      user_id = this.currentUser.id;
      //console.log("you are logged in under user id of :",user_id)
      //console.log("User object:",this.currentUser)
      this.group = this.currentUser.groups[0];
      if( this.group == "Professor"){
        this.retrieveReports(user_id);
      }
    }
  }

  retrieveReports(user_id: number): void {
    this.professorService.findByUser(user_id).subscribe(
      data => {
        this.currentProfessor = <Professor> data;
        this.professorService.getReportJury(this.currentProfessor.id).subscribe(
          reports => {
            this.reports = reports;
            this.hideSpinner = true;
          }
        );
      }
    );
  }

  renitialiserFiltres(){
    this.filterPromotion='';
    this.selectFiliere='';
    this.selectedReportType='';
    this.dateFilter='';
  }

  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
