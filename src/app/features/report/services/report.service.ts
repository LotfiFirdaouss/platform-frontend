import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

const baseUrl = 'http://127.0.0.1:8080/api/rapports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl);
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

    return this.http.post(baseUrl, formData);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
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
}