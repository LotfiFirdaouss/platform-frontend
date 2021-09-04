import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from 'src/app/core/services/export.service';

@Component({
  selector: 'app-report-stats',
  templateUrl: './report-stats.component.html',
  styleUrls: ['./report-stats.component.css']
})
export class ReportStatsComponent implements OnInit {

  /* the table reference */
  @ViewChild('userTable') userTable: ElementRef;
  nameFilter:'';

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
  }

  users= [{'id':1,'name':'fifi'},{'id':2,'name':'jiji'}]

  /**
   * Function prepares data to pass to export service to create excel from Table DOM reference
   *
   */
   exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'user_data');
  }

}
