import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from './../../shared/models/service' ; 

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Add service
  AddService(service : Service ) {

    let api = `${this.endpoint}/Addservice`;
    
      return  this.http.post<any>(api, service)
  
  }
  ModifyService(service : Service ) {

    let api = `${this.endpoint}/Modifyservice`;
    
      return  this.http.post<any>(api, service)
  
  }

  // Remove service
  Removeservice(a: number){

    let api = `${this.endpoint}/Removeservice` ; 
    return this.http.post<Number>(api,a).subscribe()

  }


  // show service
  Allservice(){ 
  
    let api = `${this.endpoint}/Allservice` ; 
     return this.http.get<Service[]>(api) ;
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