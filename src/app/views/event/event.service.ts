import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEvent } from '../../shared/models/createEvent' ; 
import {Goods_provided} from '../../shared/models/goods_provided';
import {Service_provided} from '../../shared/models/service_provided';
import {Volunteer_provided} from '../../shared/models/volunteer_provided' ; 

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  events(id:number){ 
  
    let api = `${this.endpoint}/event/${id}` ; 
    console.log(api) ;
     return this.http.get<createEvent>(api) ;
  }

  donategoods(goods_provided:Goods_provided){
    let api = `${this.endpoint}/donate_goods` ; 
    return this.http.post<Goods_provided>(api,goods_provided).subscribe() 
  }

  donateservice(service_provided:Service_provided){
    let api = `${this.endpoint}/donate_service` ; 
    return this.http.post<Service_provided>(api,service_provided).subscribe() 
  }
  participate(volunteer_provided : Volunteer_provided){
    let api = `${this.endpoint}/participate_event` ; 
    return this.http.post<Volunteer_provided>(api,volunteer_provided).subscribe() 


  }

}
