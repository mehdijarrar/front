import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Unconfirmed_donation } from '../../shared/models/unconfirmed_donation' ; 

@Injectable({
  providedIn: 'root'
})

export class ConfirmDonationService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  //confirm service 

  Confirmservice(a: number){
    let api = `${this.endpoint}/confirmservice` ; 
    return this.http.post<Number>(api,a).subscribe()
  }

  // Remove service
  Removeservice(a: number){

    let api = `${this.endpoint}/Removeconfirmservice` ; 
    return this.http.post<Number>(api,a).subscribe()

  }

 //confirm service 

 Confirmgoods(a: number){
  let api = `${this.endpoint}/confirmgoods` ; 
  return this.http.post<Number>(api,a).subscribe()
}

// Remove service
Removegoods(a: number){

  let api = `${this.endpoint}/Removeconfirmgoods` ; 
  return this.http.post<Number>(api,a).subscribe()

}





  // show service
  Alldonations(){ 
  
    let api = `${this.endpoint}/ConfirmDonation` ; 
     return this.http.get<Unconfirmed_donation>(api) ;
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