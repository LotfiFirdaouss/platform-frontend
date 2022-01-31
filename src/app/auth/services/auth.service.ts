import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';


const AUTH_API = GlobalConstants.backendApiURL+'sign/In/token/'; //login
const REGISTER_API = GlobalConstants.backendApiURL+'sign/Up'; //register
const BASEURL = GlobalConstants.backendApiURL+'sign/password_reset/'; //reset pwd

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

  register(user: { groups:any, first_name: any; last_name: any; username: any; password: any; email: any; }): Observable<any>{
    return this.http.post(REGISTER_API, JSON.stringify(user) , httpOptions);
  }

  //for pwd reset
  requestReset(user : {email : any;}): Observable<any> {
    return this.http.post(BASEURL, JSON.stringify(user) , httpOptions);
  }

  // for validating the token and checking if it’s still active.
  ValidPasswordToken(user : { token: any ,email : any;}): Observable<any> {
    return this.http.post(BASEURL, JSON.stringify(user) , httpOptions);
  }

  //for changing the pwd
  newPassword(user : { token:any; password : any;}): Observable<any> {
    return this.http.post(BASEURL+"confirm/", JSON.stringify(user) , httpOptions);
  }
  
}
