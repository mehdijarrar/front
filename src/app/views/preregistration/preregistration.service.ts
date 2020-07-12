import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preregistration } from '../../shared/models/preregistration' ; 
import { notif } from '../../shared/models/notif' ;
@Injectable({
  providedIn: 'root'
})

export class PreregistrationService {
  endpoint: string = 'http://localhost:8083';
  
  
    key = 'AAAAVgzO1YU:APA91bGrvL2yrG5of_MXymxNbRUowFZIa-dgGn8q2hOqr9CgOgMZUBjjQeP6Dg2pHD-7lkUVjJm255DgWLWyyCZ-M010za8LYZIlmoLr7m8fAUvBE3RYDMEzCARSEiCdbOXFZJp7HG9M' ; 
    endpoint2: string = 'https://fcm.googleapis.com/fcm/send';
   headers = new HttpHeaders().set('authentication', 'key='+this.key).set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router , 

  ) {
  }

  push(notif : notif ) {
    
    let api2 = `${this.endpoint2}`;

   return  this.http.post<notif>(api2, notif ,{headers : this.headers})
  
  }

  delete(a:number){
    let api = `${this.endpoint}/Removepreregistration` ; 
    return this.http.post<Number>(api,a).subscribe()

  }
  Allpreregistration(){ 
  
    let api = `${this.endpoint}/preregistration` ; 
     return this.http.get<Preregistration[]>(api) ;
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