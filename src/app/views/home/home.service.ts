import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event } from './../../shared/models/event' ; 
import {EventUser} from './../../shared/models/EventUser' ; 
import {Preinfo} from './../../shared/models/preinfo' ; 
import {Money_provided} from './../../shared/models/money_provided' ; 

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }
  eventsuser(id:Number){
    let api = `${this.endpoint}/eventsuser/${id}` ; 
    return this.http.get<EventUser[]>(api) ;

  }
  subscribe(a:Preinfo ){
    let api = `${this.endpoint}/addpreregistration` ; 
    return this.http.post<Preinfo>(api,a).subscribe() ;

  }

  donatemoney(a:Money_provided ){
    let api = `${this.endpoint}/donate_money` ; 
    return this.http.post<Money_provided>(api,a).subscribe() ;

  }
  unsubscribe(a:Preinfo){
    let api = `${this.endpoint}/deletepreregistration` ; 
    return this.http.post<Preinfo>(api,a).subscribe() ;


  }

  events(){ 
  
    let api = `${this.endpoint}/events` ; 
     return this.http.get<Event[]>(api) ;
  }
}
