import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../report/models/report';
import { Professor } from '../models/professor';

const baseUrl = 'http://127.0.0.1:8080/api/professeurs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

 
  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(baseUrl);
  }

  get(id: any): Observable<Professor> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getReportJury(id: any): Observable<Report[]> {
    return this.http.get<Report[]>(`http://127.0.0.1:8080/api/rapports/jury?jury=${id}`);
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

  findProfessorByEmail(email_pro: any): Observable<Professor> {
    return this.http.get(`${baseUrl}/email?email=${email_pro}`);
  }

  findByUser(fk_user: any): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${baseUrl}/user?user=${fk_user}`);
  }

  deleteUser(fk_user: any): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8080/api/user/${fk_user}`);
  }

}
