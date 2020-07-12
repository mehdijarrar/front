import { Injectable } from '@angular/core';

import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEvent } from './../../shared/models/createEvent' ; 
import {Service} from './../../shared/models/service'
import {Goods} from './../../shared/models/goods'
import { stringify } from 'querystring';
import {test} from './../../shared/models/test' ; 


@Injectable({
  providedIn: 'root'
})

export class EventService {
  endpoint: string = 'http://localhost:8083';
   headers = new HttpHeaders().set('Accept', 'application/json');
  t:test ; 

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }
  
  Allservice(){ 
  
    let api = `${this.endpoint}/Allservice` ; 
     return this.http.get<Service[]>(api) ;
  }

  Allgoods(){ 
  
    let api = `${this.endpoint}/Allgoods` ; 
     return this.http.get<Goods[]>(api) ;
  }

  // Add event
  AddEvent(img :FormData ) {
   
    const body = {File};
    let api = `${this.endpoint}/create-event`;
     
   
    

    return this.http.post<any>(api, img)
      .subscribe((res: any) => {
        console.log(res);
      })
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