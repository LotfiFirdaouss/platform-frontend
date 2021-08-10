import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api/token/'; //login
const REGISTER_API = 'http://127.0.0.1:8000/account/api/register'; //register

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: { username: any; password: any;}): Observable<any>{
    return this.http.post(AUTH_API ,JSON.stringify(user), httpOptions);
  }

  register(user: { groups:any, username: any; password: any; email: any; }): Observable<any>{
    return this.http.post(REGISTER_API, JSON.stringify(user) , httpOptions);
  }
  
}
