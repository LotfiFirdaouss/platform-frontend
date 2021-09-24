import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { map } from 'rxjs/operators';

const baseUrl = 'http://127.0.0.1:8080/api/rapports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl);
  }

  getAllReportValidatedAdmin(): Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl).pipe(map(result =>result.filter(report => report.valid_admin===true)));
  }

  get(id: any): Observable<Report> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('stage_ou_projet',data.stage_ou_projet);
    formData.append('date_debut_stage',data.date_debut_stage);
    formData.append('date_fin_stage',data.date_fin_stage);
    formData.append('intitule_stage',data.intitule_stage);
    formData.append('societe_stage',data.societe_stage);
    formData.append('secteur_societe',data.secteur_societe);
    formData.append('ville_societe',data.ville_societe);
    formData.append('pays_societe',data.pays_societe);
    formData.append('details_add_societe',data.details_add_societe);
    formData.append('encadrant',data.encadrant);
    formData.append('email_encadrant',data.email_encadrant);
    formData.append('telephone_encadrant',data.telephone_encadrant);
    formData.append('fichier_rapport',data.fichier_rapport,data.fichier_rapport.name);
    formData.append('rapport_confidentiel',data.rapport_confidentiel);
    formData.append('fk_etudiant',data.fk_etudiant);
    formData.append('type_rapport',data.type_rapport);
    formData.append('resume_rapport',data.resume_rapport);

    return this.http.post(baseUrl, formData);
  }

  update(id: any, data: any): Observable<any> {
    const formData: FormData = new FormData();
    if(data.stage_ou_projet!=null){
      formData.append('stage_ou_projet',data.stage_ou_projet);
    }    
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
    if(data.encadrant){
      formData.append('encadrant',data.encadrant);
    }
    if(data.email_encadrant){
      formData.append('email_encadrant',data.email_encadrant);
    }
    if(data.telephone_encadrant){
      formData.append('telephone_encadrant',data.telephone_encadrant);
    }
    if(data.fichier_rapport!=null){
      console.log("heeere fichier rapport")
      formData.append('fichier_rapport',data.fichier_rapport,data.fichier_rapport.name);
    }
    if(data.resume_rapport){
      console.log("resume")
      formData.append('resume_rapport',data.resume_rapport);
    }
    if(data.valid_admin!=null){
      formData.append('valid_admin',data.valid_admin);
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

  // printReportsFile(filiere: any, promotion: any): Observable<Report[]> {
  //   return this.http.get<Report[]>(`${baseUrl}?filiere=${filiere}&?promotion=${promotion}`);
  // }
}