import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError) 
        
        )
    
  }

  // Sign-in
  signIn(user: User) {
    
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        
        
        localStorage.setItem('access_token', res.token) ;
       
        localStorage.setItem ('userid', res.id) ;
        localStorage.setItem ('role', res.role) ; 


        if(localStorage.getItem('role') === "ROLE_ADMIN" ){
          this.router.navigate(['admin/dashboard']);
        }
        if(localStorage.getItem('role') === "ROLE_USER" ){
          this.router.navigate(['user']);
        }
        if(localStorage.getItem('role') === "ROLE_MEMBER" ){
          this.router.navigate(['member']);
        }
        if(localStorage.getItem('role') === "ROLE_SUBSCRIBER" ){
          this.router.navigate(['subscriber']);
        }
        
        console.log(res);
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  getRole(){
    return localStorage.getItem('role') ; 

  }
  get isAdmin() : boolean {

    let role = localStorage.getItem('role') ; 
  
    return (role === "ROLE_ADMIN") ? true : false;

  }
  get isUser() : boolean {

    let role = localStorage.getItem('role') ; 
  
    return (role === "ROLE_USER") ? true : false;

  }

  get isMember() : boolean {

    let role = localStorage.getItem('role') ; 
   
    return (role === "ROLE_MEMBER") ? true : false;

  }
  get isSubscriber() : boolean {

    let role = localStorage.getItem('role') ; 
   
    return (role === "ROLE_SUBSCRIBER") ? true : false;

  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}