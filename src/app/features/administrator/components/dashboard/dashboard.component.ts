import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Report } from 'src/app/features/report/models/report';
import { PromotionFilterDashboardPipe } from '../../pipes/promotion-filter.pipe';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Report[];
  filterPromotionStage:'';
  filterPromotionProjet:'';
  
  //number of stageReport 
  stageReport:number;

  //number of projetReport 
  projetReport:number;

  //doughnutProjet
  public doughnutPROJETChartLabels: Label[] = [];
  public doughnutPROJETChartData = [];
  public doughnutPROJETChartType: ChartType = 'doughnut';
  public doughnutPROJETChartOptions: ChartOptions = {cutoutPercentage: 80,};
  public doughnutPROJETChartColors: Color[] = [];
  public loadingDoughnutPROJET=true;
  
  //doughnutStage
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {cutoutPercentage: 80,};
  public doughnutChartColors: Color[] = [];
  public loadingDoughnut=true;


  //ChartLine1
  public lineChartData1=[{ data:[], label: 'Stage par société'}];
  public lineChartLabels1:Label[]=[];
  public lineChartOptions: (ChartOptions & { annotation: any })={
    responsive: true,
    legend: { display: true},
    scales: {
      xAxes: [{}],
      yAxes: [{id: 'y-axis-1',position: 'left',gridLines: {color: 'white',},ticks: {fontColor: 'white',}}]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors1: Color[] = [];
  public lineChartType1: ChartType = 'line';
  public loadingLineChart1=true;

  //lineChart2
  public lineChartData2: ChartDataSets[] = [{ data:[], label: ''}];
  public lineChartLabels2: Label[] = [];
  public lineChartColors2: Color[] = [];
  public lineChartType2: ChartType = 'line';
  public loadingLineChart2=true;

  //barChart
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: { display: true},
    scales: {
      xAxes: [{}],
      yAxes: [{id: 'y-axis-1',position: 'left',gridLines: {color: 'white',},ticks: {fontColor: 'white',}}]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartColors: Color[] = [];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataSets[] = [{ data:[], label: 'Stage par ville'}];
  public loadingBarChart=true;

  constructor(private dashboardService: DashboardService,
              private promotionFilter: PromotionFilterDashboardPipe) { }

  ngOnInit(): void {
    this.calculateStage();
    this.calculateProjet();
  }

  public calculateProjet(): void {
    this.dashboardService.getAllReportProjet().subscribe(data => 
      {
        this.reports=this.promotionFilter.transform(data,this.filterPromotionProjet);
        this.projetReport=this.reports.length;
        this.buildDoughnutPROJET(this.reports);
      });
  }

  public calculateStage(): void {
    this.dashboardService.getAllReportStage().subscribe(data => 
      {
        this.reports=this.promotionFilter.transform(data,this.filterPromotionStage);
        this.stageReport=this.reports.length;
        this.buildLineChart1(this.reports);
        this.buildDoughnut(this.reports);
        this.buildLineChart2(this.reports);
        this.buildBarChart(this.reports.filter(r=>r.ville_societe!==null && r.ville_societe!==''));
      });
  }

  public renitialiserFiltres(): void {
    this.filterPromotionStage='';
    this.filterPromotionProjet='';
    this.calculateStage();
    this.calculateProjet();
  }

  public buildDoughnutPROJET(data:Report[]) {
    this.doughnutPROJETChartLabels = [];
    this.doughnutPROJETChartData = [];

    if(data.length!==0){
      let distinctfilieres =[];
      distinctfilieres = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.fk_etudiant.filiere === thing.fk_etudiant.filiere) === i
      );
      distinctfilieres.map(
        report_filiere => {
        this.doughnutPROJETChartLabels.push(report_filiere.fk_etudiant.filiere);
        this.doughnutPROJETChartData.push(
          data.filter(report=>report.fk_etudiant.filiere == report_filiere.fk_etudiant.filiere).length)
        }
      );
      this.loadingDoughnutPROJET=false;
      this.doughnutPROJETChartColors=[
        {
          backgroundColor: ['#fd9518','#17f13b','#5397f8','#f117cd','#95d4f1','#fabbda'],
          borderColor: '#002345af',
          borderWidth: 1,
        }];
    }   
  }

  public buildLineChart1(data:Report[]): void {
    this.lineChartLabels1 = [];
    this.lineChartData1 = [{ data:[], label: 'Stage par société'}];

    if(data.length!==0){
      let distinctSocietes =[];
      distinctSocietes = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.societe_stage === thing.societe_stage) === i
      );
      distinctSocietes.map(
        report_societe => {
        this.lineChartLabels1.push(report_societe.societe_stage);
        this.lineChartData1.forEach(
          (element) => 
            element.data.push(data.filter(report=>report.societe_stage==report_societe.societe_stage).length)
        )}
      );
      this.lineChartColors1=[{ 
        borderColor: '#fd9518',
        pointBackgroundColor: '#fd9518',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#fd9518'
      }];
      this.loadingLineChart1=false;
    }
  }

  public buildDoughnut(data:Report[]): void {
    this.doughnutChartLabels= [];
    this.doughnutChartData = [];
    if(data.length!==0){
      let distinctfilieres =[];
      distinctfilieres = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.fk_etudiant.filiere === thing.fk_etudiant.filiere) === i
      );
      distinctfilieres.map(
        report_filiere => {
        this.doughnutChartLabels.push(report_filiere.fk_etudiant.filiere);
        this.doughnutChartData.push(
          data.filter(report=>report.fk_etudiant.filiere == report_filiere.fk_etudiant.filiere).length)
      });
      this.doughnutChartColors=[
        {
          backgroundColor: ['#fd9518','#17f13b','#5397f8','#f117cd','#95d4f1','#fabbda'],
          borderColor: '#002345af',
          borderWidth: 1,
        }];
        this.loadingDoughnut=false;
    }  
  }

  public buildLineChart2(data:Report[]): void {
    this.lineChartData2 = [{ data:[], label: ''}];
    this.lineChartLabels2 = [];
    if(data.length!==0){
      let distinctSocietes =[];
      let distinctfilieres =[];
      distinctfilieres = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.fk_etudiant.filiere === thing.fk_etudiant.filiere) === i
      );
      distinctSocietes = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.societe_stage === thing.societe_stage) === i
      );
      distinctSocietes.map(report_societe => {this.lineChartLabels2.push(report_societe.societe_stage);});
      this.lineChartData2=[];
      distinctfilieres.map(
        report_filiere => { 
        let value=[];
        distinctSocietes.map(report_societe => {
          value.push(data.filter(report=>(report.societe_stage==report_societe.societe_stage)&&(report.fk_etudiant.filiere==report_filiere.fk_etudiant.filiere)).length)
        });
        this.lineChartData2.push({
          data:value,
          label:report_filiere.fk_etudiant.filiere
        });
        }
      );
      this.lineChartColors2=[{ 
      borderColor: '#fd9518',
      pointBackgroundColor: '#fd9518',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fd9518'
      },{ 
      borderColor: '#17f13b',
      pointBackgroundColor: '#17f13b',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#17f13b'
      },{ 
      borderColor: '#5397f8',
      pointBackgroundColor: '#5397f8',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#5397f8'
      },{ 
      borderColor: '#f117cd',
      pointBackgroundColor: '#f117cd',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f117cd'
      },{ 
      borderColor: '#95d4f1',
      pointBackgroundColor: '#95d4f1',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#95d4f1'
      },{ 
      borderColor: '#fabbda',
      pointBackgroundColor: '#fabbda',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fabbda'
      }];
      this.loadingLineChart2=false;
    }
  }

  public buildBarChart(data:Report[]): void {
    this.barChartLabels = [];
    this.barChartData = [{ data:[], label: 'Stage par ville'}];

    if(data.length!==0){
      let distinctVille =[];
      distinctVille = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.ville_societe === thing.ville_societe) === i
      );
      distinctVille.map(
        report_ville => {
        this.barChartLabels.push(report_ville.ville_societe);
        this.barChartData.forEach(
          (element) => 
            element.data.push(data.filter(report=>report.ville_societe==report_ville.ville_societe).length)
        )}
      );
      this.barChartColors=[{
        backgroundColor: '#5397f8',
        borderColor: '#002345af',
      }];
      this.loadingBarChart=false;
    }
  }

}