import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insertion } from '../models/insertion.model';

const baseUrl = 'http://localhost:8080/api/insertions';

@Injectable({
  providedIn: 'root'
})
export class InsertionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Insertion[]> {
    return this.http.get<Insertion[]>(baseUrl);
  }

  get(id: any): Observable<Insertion> {
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

  findByStudent(fk_etudiant: any): Observable<Insertion[]> {
    return this.http.get<Insertion[]>(`${baseUrl}?etudiant=${fk_etudiant}`);
  }

}
