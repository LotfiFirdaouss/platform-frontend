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
    return this.http.post(baseUrl, data);
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
