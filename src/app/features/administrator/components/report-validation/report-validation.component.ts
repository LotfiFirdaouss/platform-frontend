import { Component, OnInit } from '@angular/core';
import { Nature } from 'src/app/features/report/models/nature.model';
import { Report } from 'src/app/features/report/models/report';
// import { PromotionFilterPipe } from 'src/app/features/report/pipes/promotion-filter.pipe';
// import { FiliereFilterPipe } from 'src/app/features/report/pipes/filiere-filter.pipe';
// import { ReportTypeFilterPipe } from 'src/app/features/report/pipes/report-type-filter.pipe';
// import { AdminValidatedPipe } from 'src/app/features/administrator/pipes/admin-validated.pipe';
import { AllFiltersInPipe } from 'src/app/features/administrator/pipes/all-filters-in.pipe';
import { ReportService } from 'src/app/features/report/services/report.service';

@Component({
  selector: 'app-report-validation',
  templateUrl: './report-validation.component.html',
  styleUrls: ['./report-validation.component.css']
})
export class ReportValidationComponent implements OnInit {

  reports?: Report[];
  edit: { [key: string]: { edit: boolean }} = {}; 
  currentReport?: Report;
  currentIndex = -1;

  natures : Nature[] = [{'name':'stage','nature':true},{'name':'projet','nature':false}];
  types_rapport=['Initiation','PFA','PFE']

  //for pagination
  p: number = 1;

  //filters
  filterPromotion:'';
  selectFiliere:'';
  selectedReportType:"";
  filterCode:"";

  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly Report[] = [];
  hideSpinner=false;


  constructor(private reportService : ReportService,
    // private promotionFilterPipe: PromotionFilterPipe,
    // private filiereFilterPipe: FiliereFilterPipe,
    // private reportTypeFilterPipe: ReportTypeFilterPipe,
    // private adminValidatedPipe: AdminValidatedPipe
    private allFiltersInPipe: AllFiltersInPipe ) { }

  ngOnInit(): void {
    this.retrieveReports();
  }

  retrieveReports(): void {
    this.hideSpinner=false;

    this.reportService.getAllReportnotValidated() 
      .subscribe(
        data => {
          this.reports = data;
          this.reports.forEach(item => {
            this.edit[item.id]= {
              edit: false
            };
          });
          this.hideSpinner=true;
        },
        error => {
          console.log(error);
        });
  }

  setActiveReport(report: Report, index: number): void {
    this.currentReport = report;
    this.currentIndex = index;
  }

  deleteReport(id:number): void {
    const index = this.reports.findIndex(item => item.id === id);
    this.reportService.delete(id).subscribe(
      response => {
        this.retrieveReports();
      });   
  }

  startEditReport(id:number): void {
    this.edit[id].edit = true;
  }

  cancelEditReport(): void {    
    this.retrieveReports();
  }

  saveEditReport(id: string): void {
    // this.hideSpinner=false;
    const index = this.reports.findIndex(item => item.id === id);
    const data = { 
      fk_etudiant:this.reports[index].fk_etudiant.id,
      stage_ou_projet:this.reports[index].stage_ou_projet,
      // date_debut_stage:this.reports[index].date_debut_stage,
      // date_fin_stage:this.reports[index].date_fin_stage,
      intitule_stage:this.reports[index].intitule_stage,
      societe_stage:this.reports[index].societe_stage,
      secteur_societe:this.reports[index].secteur_societe,
      // ville_societe:this.reports[index].ville_societe,
      // pays_societe:this.reports[index].pays_societe,
      rapport_confidentiel:Boolean(this.reports[index].rapport_confidentiel),
      // type_rapport:this.reports[index].type_rapport,
      valid_admin:this.reports[index].valid_admin,
      valid_encadrant:this.reports[index].valid_encadrant,
      // email_encadrant:this.reports[index].email_encadrant,
      // telephone_encadrant:this.reports[index].telephone_encadrant,
    };
    if(this.reports[index].date_debut_stage!=null && this.reports[index].date_fin_stage){
      data['date_debut_stage']=this.reports[index].date_debut_stage;
      data['date_fin_stage']=this.reports[index].date_fin_stage;
    }
    if(this.reports[index].ville_societe!=null){
      data['ville_societe']=this.reports[index].ville_societe;
    }
    if(this.reports[index].pays_societe!=null){
      data['pays_societe']=this.reports[index].pays_societe;
    }

    //console.log(data)
    this.reportService.updateMotsClesJury(this.reports[index].id, data)
     .subscribe(
       response => {
        console.log("updated report on modification:",response)
         this.retrieveReports();
       },
       error => {
         console.log(error);
      });
  }

  capitalizeFirstLetter(string) {
    //console.log("capitalize")
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renitialiserFiltres(){
    this.setOfCheckedId.clear();
    this.filterPromotion='';
    this.selectFiliere='';
    this.selectedReportType='';
    this.filterCode='';
    this.retrieveReports();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    //console.log("updaaate:",id,checked)
    //console.log("set of checked:",this.setOfCheckedId)
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    //console.log("AFTER set of checked:",this.setOfCheckedId)

  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Report[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    //console.log(this.lisdtOfCurrentPageData)
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ valid_admin }) => !valid_admin);
    // const listOfEnabledData = this.listOfCurrentPageData.filter(( report ) => {
    //   return report.fk_etudiant.promotion==this.filterPromotion;
    // }).filter(({ valid_admin }) => !valid_admin);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    //console.log("checked",this.checked)
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    //console.log(this.listOfCurrentPageData)
    this.listOfCurrentPageData
      .filter(({ valid_admin }) => !valid_admin)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    // this.hideSpinner=false;
    this.loading = true;
    const requestData = this.reports.filter(data => this.setOfCheckedId.has(data.id));
    //console.log(requestData);
    requestData.map(report => {
      report['valid_admin']=true;
      // console.log(report)
      this.reportService.updateMotsClesJury(report.id, 
        {
          'valid_admin':true,
          'fk_etudiant':report.fk_etudiant.id,
          'stage_ou_projet':report.stage_ou_projet,
          'valid_encadrant':report.valid_encadrant
        })
      .subscribe( 
        response => {
          console.log("updated report on validation:",response)
          this.renitialiserFiltres();  
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

  // onKeyPromotion(){
  //   console.log("promotion",this.filterPromotion)
  //   this.onCurrentPageDataChange(this.promotionFilterPipe.transform(this.reports,this.filterPromotion));
  // }
  
  // changeFiliere(){
  //   console.log("filiere",this.selectFiliere)
  //   this.onCurrentPageDataChange(this.filiereFilterPipe.transform(this.reports,this.selectFiliere));
  // }
  
  // changeReportType(){
  //   console.log("report type",this.selectedReportType)
  //   this.onCurrentPageDataChange(this.reportTypeFilterPipe.transform(this.reports,this.selectedReportType));
  // }
  
  // changeValid(){
  //   console.log("valid admin",this.selectedValidatedAdmin)
  //   this.onCurrentPageDataChange(this.adminValidatedPipe.transform(this.reports,this.selectedValidatedAdmin));
  // }

  applyFilters(){
    this.setOfCheckedId.clear();
    this.reports = this.allFiltersInPipe.transform(this.reports,this.filterPromotion,this.selectFiliere,this.filterCode,this.selectedReportType);

  }

}
