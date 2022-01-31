import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';
import { Student } from '../models/student';

const baseUrl = GlobalConstants.backendApiURL+'api/etudiants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl);
  }
  
  getCurrentStudents(promotion: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${baseUrl}?promotion=${promotion}`);
  }

  get(id: any): Observable<Student> {
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

  findStudentByEmail(email_pro: any): Observable<Student> {
    return this.http.get(`${baseUrl}/email?email=${email_pro}`);
  
  }
  
  findByUser(fk_user: any): Observable<Student[]> {
    return this.http.get<Student[]>(`${baseUrl}?user=${fk_user}`);
  }
}
