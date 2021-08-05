import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-student',
  templateUrl: './report-student.component.html',
  styleUrls: ['./report-student.component.css']
})
export class ReportStudentComponent implements OnInit {

  reports?: Report[];
  currentReport?: Report;
  currentIndex = -1;

  constructor(private reportService: ReportService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.etudiant);
    this.getReport(this.route.snapshot.params.etudiant);
  }

  getReport(id: string): void {
    this.reportService.findByStudent(id)
      .subscribe(
        data => {
          this.reports = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveReport(report: Report, index: number): void {
    this.currentReport = report;
    this.currentIndex = index;
  }

}
