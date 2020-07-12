import { Injectable } from '@angular/core';

import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {Users} from '../../shared/models/users' ; 

@Injectable({
    providedIn: 'root'
  })

export class UsersService {

    endpoint: string = 'http://localhost:8083';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  
    constructor(
      private http: HttpClient,
      public router: Router
    ) {
    }


    Removeuser(a: number){

      let api = `${this.endpoint}/Removeuser` ; 
      return this.http.post<Number>(api,a).subscribe()
  
    }

    // show service
  Allusers(){ 
  
    let api = `${this.endpoint}/users` ; 
     return this.http.get<Users[]>(api) ;
  }


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