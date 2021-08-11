import { Injectable } from '@angular/core';
import { ReturnedUser } from '../models/returned-user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): {} {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return  {};
  }

  public isAuthenticated(): { authenticated: boolean }{
    //console.log(this.getToken())
    if(this.getToken()){
      return { "authenticated": true } ;
    }else{
      return { "authenticated": false };
    }
  }

  public isAdministrator(): { administrator: boolean }{
    if(this.getToken()){ //here we know the user is logged in
      var currentUser = <ReturnedUser> this.getUser();
      if( currentUser.groups[0] == "Administrator" ){ //here we check the group (that he's an administrator)
        return { "administrator": true } ;
      }else{
        return { "administrator": false } ;
      }
    }
    return { "administrator": false };
  }

  public isProfessor(): { professor: boolean }{
    if(this.getToken()){ //here we know the user is logged in
      var currentUser = <ReturnedUser> this.getUser();
      if( currentUser.groups[0] == "Professor" ){ //here we check the group (that he's an administrator)
        return { "professor": true } ;
      }else{
        return { "professor": false } ;
      }
    }
    return { "professor": false };
  }

  public isStudent(): { student: boolean }{
    if(this.getToken()){ //here we know the user is logged in
      var currentUser = <ReturnedUser> this.getUser();
      if( currentUser.groups[0] == "Student" ){ //here we check the group (that he's an administrator)
        return { "student": true } ;
      }else{
        return { "student": false } ;
      }
    }
    return { "student": false };
  }

}
