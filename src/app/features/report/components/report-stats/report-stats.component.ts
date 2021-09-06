import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from 'src/app/core/services/export.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-stats',
  templateUrl: './report-stats.component.html',
  styleUrls: ['./report-stats.component.css']
})
export class ReportStatsComponent implements OnInit {

  /* the table reference */
  @ViewChild('reportTable') reportTable: ElementRef;

  //list of reports
  reports?: Report[];

  //filters
  filterPromotion:'';
  selectFiliere:'';
  selectedReportType:"";
   
  //For spinner
  hideSpinner = false;

  //for pagination
  p=1;

  constructor(
    private reportService: ReportService,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.retrieveReports();
  }

  retrieveReports(): void {
    this.reportService.getAll()
      .subscribe(
        data => {
          this.reports = data;
          console.log(data);
          //this.hideSpinner();
          this.hideSpinner = true;
        },
        error => {
          console.log(error);
        });
 }

//  fileLink(re){
//   //return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentReport.fichier_rapport.toString());
//   var fileLink= this.currentReport.fichier_rapport.toString().split('&')[0];
//  }

  //exprt table  function  
  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.reportTable, 'reports_data');
  }

  renitialiserFiltres(){
    this.filterPromotion='';
    this.selectFiliere='';
    this.selectedReportType='';
  }

}
