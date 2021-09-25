import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Report } from 'src/app/features/report/models/report';
import { ReportService } from 'src/app/features/report/services/report.service';
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-report-professor-validation',
  templateUrl: './report-professor-validation.component.html',
  styleUrls: ['./report-professor-validation.component.css']
})
export class ReportProfessorValidationComponent implements OnInit {
  
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Report[] = [];
  listOfCurrentPageData: readonly Report[] = [];
  setOfCheckedId = new Set<number>();
  reports ?:Report[];

  currentUser!: ReturnedUser;
  isLoggedIn = false;
  user_id=0;
  currentProfessor!: Professor;

  constructor(private reportService: ReportService,
    private token: TokenStorageService,
    private professorService : ProfessorService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();    
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.user_id = this.currentUser.id;
      console.log("User object:",this.currentUser);
      this.getProfessor(this.user_id);
    }  
    
  }

  getProfessor(id_user: number): void {
    this.professorService.findByUser(id_user)
      .subscribe(
        data => {
          this.currentProfessor = <Professor> data;
          console.log("Professor object:", this.currentProfessor)
          this.retrieveReports(this.currentProfessor.id);
        },
        error => {
          console.log(error);
        });
  }

  retrieveReports(professor_id:number): void {
    this.reportService.getSupervizedReportsValidatedAdmin(professor_id)
      .subscribe(
        data => {
          this.reports = data;
          console.log(data);
          //this.hideSpinner();
          //this.hideSpinner = true;
        },
        error => {
          console.log(error);
        });
 }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Report[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ valid_encadrant }) => !valid_encadrant);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ valid_encadrant }) => !valid_encadrant)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.reports.filter(report => this.setOfCheckedId.has(report.id));
    console.log(requestData);
    requestData.map(report => {
      // report['valid_encadrant']=true;
      this.reportService.update(report.id, {
        'valid_encadrant':true,
        'fk_etudiant':report.fk_etudiant.id,
        'stage_ou_projet':report.stage_ou_projet,
        'valid_admin':report.valid_admin})
      .subscribe(
        response => {
          console.log(response)
          this.getProfessor(this.user_id);        
        },
        error => {
          console.log(error);
       });
    })
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
