import { Injectable } from '@angular/core';

import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from './../../shared/models/service' ; 
import { Goods } from './../../shared/models/goods' ;

import {Eventlist} from './../../shared/models/eventlist'

import {Service_needed} from './../../shared/models/service_needed'
import {createEvent} from './../../shared/models/createEvent' ; 

@Injectable({
  providedIn: 'root'
})

export class EventListService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

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

 
  Allevents(){ 
  
    let api = `${this.endpoint}/allevents` ; 
     return this.http.get<Eventlist[]>(api) ;
  }

  Removeevent(a:Number) {
    let api = `${this.endpoint}/Removeevent` ; 
    return this.http.post<Number>(api,a).subscribe()
  }

  modifyevent(createEvent : createEvent) {
    let api = `${this.endpoint}/modifyevent` ; 
    return this.http.post<Number>(api,createEvent).subscribe((res: any) => {
      console.log(res);
    })
  }

  showevent(a:number){

    let api = `${this.endpoint}/Showevent/${a}` ; 
    return this.http.get<createEvent>(api) ; 

  }

  services_needed_by_event(id_event:Number){
    
    let api = `${this.endpoint}/service_needed_by_event/${id_event}` ; 
    return this.http.get<Service_needed[]>(api) ;
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