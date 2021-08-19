import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';

const baseUrl = 'http://localhost:8080/api/professeurs'; 

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

  findByUser(fk_user: any): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${baseUrl}?user=${fk_user}`);
  }

}
