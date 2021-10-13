import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { map } from 'rxjs/operators';
import { MotCle } from '../models/mot-cle';
import { Student } from '../../student/models/student';

const baseUrl = 'http://127.0.0.1:8080/api/rapports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl);
  }

  //tt rapports validé par admin
  getAllReportValidatedAdmin(): Observable<Report[]> {
    // return this.http.get<Report[]>(baseUrl).pipe(map(result =>result.filter(report => report.valid_admin===true)));
    return this.http.get<Report[]>(`${baseUrl}/adminValidated`);
  }
  
  //rapports validé par admin et supervizé par un professeur X
  getSupervizedReportsValidatedAdmin(fk_encadrant_univ: number): Observable<Report[]> {
    // return this.http.get<Report[]>(baseUrl).pipe(map(result =>result.filter(report => report.valid_admin===true && report.fk_encadrant_univ==fk_encadrant_univ)));
    return this.http.get<Report[]>(`${baseUrl}/adminValidated?fk_encadrant_univ=${fk_encadrant_univ}`);
  }
  
  //rapports validé définitement par admin (et par encadrant si pfe)
  getAllReportValidated(): Observable<Report[]> {
    // return this.http.get<Report[]>(baseUrl).pipe(map(result =>result.filter(report => (report.valid_admin && report.type_rapport!='PFE') || 
    // (report.type_rapport=='PFE' && report.valid_admin && report.valid_encadrant))));
    return this.http.get<Report[]>(`${baseUrl}/validated`);

  }
  
  //get reports validated first then filtered using year(horodateur) and major(filiere)
  getAllReportValidatedAndFiltered(year: number, filiere: string,type_rapport:string): Observable<Report[]> {
    return this.http.get<Report[]>(`${baseUrl}/validatedFiltered?year=${year}&filiere=${filiere}&type_rapport=${type_rapport}`);
  }

  //rapports non validé
  getAllReportnotValidatedAndFiltered(arr: any[]): Observable<Report[]> {
    console.log(arr)
    let year =<number> arr[0];
    let filiere = <string>arr[1];
    let type_rapport =  <string>arr[2];
    if(arr[3] != null && arr[4] != null){
      console.log("ff")
      let promotion= <number>arr[3];
      let code=<string>arr[4];
      console.log(`${baseUrl}/notValidatedFiltered?year=${year}&filiere=${filiere}&type_rapport=${type_rapport}&promotion=${promotion}&code=${code}`)
      return this.http.get<Report[]>(`${baseUrl}/notValidatedFiltered?year=${year}&filiere=${filiere}&type_rapport=${type_rapport}&promotion=${promotion}&code=${code}`);
    }else{
      return this.http.get<Report[]>(`${baseUrl}/notValidatedFiltered?year=${year}&filiere=${filiere}&type_rapport=${type_rapport}`);
    }
  }

  get(id: any): Observable<Report> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any,student:Student): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('horodateur',this.getCurrentDate());
    formData.append('stage_ou_projet',data.stage_ou_projet);
    formData.append('date_debut_stage',data.date_debut_stage);
    formData.append('date_fin_stage',data.date_fin_stage);
    formData.append('intitule_stage',data.intitule_stage);
    formData.append('societe_stage',data.societe_stage);
    formData.append('secteur_societe',data.secteur_societe);
    formData.append('ville_societe',data.ville_societe);
    formData.append('pays_societe',data.pays_societe);
    formData.append('details_add_societe',data.details_add_societe);
    formData.append('parrain',data.parrain);
    formData.append('email_parrain',data.email_parrain);
    formData.append('telephone_parrain',data.telephone_parrain);
    formData.append('fichier_rapport',data.fichier_rapport,student.nom+'_'+student.prenom+'_'+data.type_rapport+'_'+student.promotion+'_'+student.filiere+'.pdf');
    formData.append('rapport_confidentiel',data.rapport_confidentiel);
    formData.append('fk_etudiant',data.fk_etudiant);
    formData.append('type_rapport',data.type_rapport);
    formData.append('resume_rapport',data.resume_rapport);
    /*formData.append('jurys',new Blob( [ JSON.stringify( data.jurys ) ], { type : 'application/json' } ));
    

    for(const index in data.jurys){ 
      formData.append(`jurys[${index}]`,data.jurys[index]);
      console.log(`jurys[${index}]`);
      console.log(data.jurys[index]);
    }*/
    

    formData.append('fk_encadrant_univ',data.fk_encadrant_univ);
    
    return this.http.post(baseUrl, formData);
  }

  updateMotsClesJury(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  

  update(id: any, data: any,student:Student): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('stage_ou_projet',data.stage_ou_projet);   
    if(data.date_debut_stage){
      formData.append('date_debut_stage',data.date_debut_stage);
    }
    if(data.date_fin_stage){
      formData.append('date_fin_stage',data.date_fin_stage);
    }
    if(data.societe_stage){
      formData.append('societe_stage',data.societe_stage);
    }
    if(data.secteur_societe){
      formData.append('secteur_societe',data.secteur_societe);
    }
    if(data.ville_societe){
      formData.append('ville_societe',data.ville_societe);
    }
    if(data.pays_societe){
      formData.append('pays_societe',data.pays_societe);
    }
    if(data.parrain){
      formData.append('parrain',data.parrain);
    }
    if(data.email_parrain){
      formData.append('email_parrain',data.email_parrain);
    }
    if(data.telephone_parrain){
      formData.append('telephone_parrain',data.telephone_parrain);
    }
    if(data.fichier_rapport!=null){
      //console.log("heeere fichier rapport")
      formData.append('fichier_rapport',data.fichier_rapport,student.nom+'_'+student.prenom+'_'+data.type_rapport+'_'+student.promotion+'_'+student.filiere+'.pdf');
    }
    if(data.resume_rapport){
      //console.log("resume")
      formData.append('resume_rapport',data.resume_rapport);
    }
    if(data.valid_admin!=null){
      formData.append('valid_admin',data.valid_admin);
    }
    if(data.valid_encadrant!=null){
      formData.append('valid_encadrant',data.valid_encadrant);
    }
    if(data.details_add_societe){
      formData.append('details_add_societe',data.details_add_societe);
    }
    if(data.intitule_stage){
      formData.append('intitule_stage',data.intitule_stage);
    }
    if(data.rapport_confidentiel!=null){
      formData.append('rapport_confidentiel',data.rapport_confidentiel);
    }
    if(data.type_rapport){
      formData.append('type_rapport',data.type_rapport);
    }
    if(data.fk_encadrant_univ){
      formData.append('fk_encadrant_univ',data.fk_encadrant_univ);
    }

    formData.append('fk_etudiant',data.fk_etudiant);

    return this.http.put(`${baseUrl}/${id}`, formData);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByStudent(fk_etudiant: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${baseUrl}?etudiant=${fk_etudiant}`);
  }

  getCurrentDate(): any {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy+'-'+mm+'-'+dd;
  }

  postMotsClés(mots:String[]) {
    for (const index in mots){
      this.getMotCle(mots[index]).subscribe(
        data => {
          if(data.mot==''){
            const mot ={mot:mots[index]};
            this.http.post(`http://127.0.0.1:8080/api/motCles/`,mot).subscribe();
          }  
      });
    }
  }

  getMotCle(mot:String): Observable<MotCle> {
    return this.http.get<MotCle>(`http://127.0.0.1:8080/api/motCles/mot?mot=${mot}`);    
  }

  getMot(id: any): Observable<MotCle> {
    return this.http.get<MotCle>(`http://127.0.0.1:8080/api/motCles/${id}`);
  }


}