import { Component, OnInit } from '@angular/core';
import { MyFormService } from '../../services/my-form.service';

@Component({
  selector: 'app-form-management',
  templateUrl: './form-management.component.html',
  styleUrls: ['./form-management.component.css']
})
export class FormManagementComponent implements OnInit {

  addRapportactivated:boolean;
  addInsertionactivated:boolean;//meaning form is working
  //in the db we the active_status = true of the form

  //changes applied
  updatedReportForm = false;
  updatedInsertionForm = false;
  message='';

  reportForm={
    "active_status": true
  }

  insertionForm={
    "active_status": true
  }


  constructor(
    private myFormService : MyFormService,
  ) { }

  ngOnInit(): void {
    //fetching active_status of report_form from db
    this.CanAddReport();
    this.CanAddInsertion();
    //console.log(this.addRapportactivated);
  }

  public CanAddReport(){
    this.myFormService.get(1).subscribe(
      data => {
        //console.log("form rapport:",data)
        this.reportForm = data;
        this.addRapportactivated = this.reportForm.active_status;
      },
      error => {
        console.log(error);
      });
  }

  public CanAddInsertion(){
    this.myFormService.get(2).subscribe(
      data => {
        //console.log("form insertion:",data)
        this.insertionForm = data;
        this.addInsertionactivated = this.insertionForm.active_status;
      },
      error => {
        console.log(error);
      });
  }

  //appliying modifications of forms active_status in db
  applyModifOnForms(){
    //console.log(this.addRapportactivated);
    this.reportForm.active_status = this.addRapportactivated;
    this.insertionForm.active_status = this.addInsertionactivated;
    //console.log("my report form object:",this.reportForm)
    this.myFormService.update(1, this.reportForm)
    .subscribe(
      response => {
        //console.log("response report",response);
        this.message = response.message;
        this.updatedReportForm = true;
      },
      error => {
        console.log(error);
      });

    this.myFormService.update(2,this.insertionForm)
    .subscribe(
      response => {
        //console.log("response insertion",response);
        this.message = response.message;
        this.updatedInsertionForm = true;
      },
      error => {
        console.log(error);
      }); 
  }

}
