import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpGuard implements CanActivate {
  location: Location;
  constructor(
    private router: Router,
    // private authService: AuthService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
        return false;
      } else {
          return true;
      }
   
      
    // return true;
  }
  
}
