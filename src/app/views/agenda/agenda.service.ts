import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {Agenda} from './../../shared/models/agendadto' ;


@Injectable({
  providedIn: 'root'
})

export class AgendaService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  Myagenda(a: number){

    let api = `${this.endpoint}/Myagenda/${a}` ; 
    return this.http.get<Agenda[]>(api)

  }

}