import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Goods } from './../../shared/models/goods' ; 

@Injectable({
  providedIn: 'root'
})

export class GoodsService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }


  ModifyService(goods : Goods) {

    let api = `${this.endpoint}/Modifygood`;
    
      return  this.http.post<any>(api, goods)
  
  }
  // Add goods
  AddGoods(goods : Goods ) {

    let api = `${this.endpoint}/Addgoods`;
    
      return  this.http.post<any>(api, goods)
  
  }

  // Remove goods
  Removegoods(a: number){

    let api = `${this.endpoint}/Removegoods` ; 
    return this.http.post<Number>(api,a).subscribe()

  }


  // show goods
  Allgoods(){ 
  
    let api = `${this.endpoint}/Allgoods` ; 
     return this.http.get<Goods[]>(api) ;
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