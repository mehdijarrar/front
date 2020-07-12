import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn === true  ) {
      if(this.authService.isUser === true){
       
        this.router.navigate(['user'])
      }
      if(this.authService.isAdmin === true){
       
        this.router.navigate(['admin'])
      }
      if(this.authService.isMember == true){
        this.router.navigate(['member'])

      }
      if(this.authService.isSubscriber ===true) {
        this.router.navigate(['subscriber']) 

      }
      
    }
  
    return true;
  }
 

  
}
