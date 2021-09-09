import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudGuard implements CanActivate {
  constructor(private token:TokenStorageService,
    private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      var isStudent = this.token.isStudent().student;
      //console.log(isStudent);
      try {
        if (isStudent) {
          return of(true);
        }
        this.router.navigate(['/login']);
        return of(false);
      } catch (Exception) {
        this.router.navigate(['/login']);
        return of(false);
      }  
    } 
  
}
