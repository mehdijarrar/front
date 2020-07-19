import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from './../../shared/models/users' ;
@Injectable({
  providedIn: 'root'
})

export class ChatroomService {
  endpoint: string = 'http://localhost:8083';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    public router: Router,
    private firestore: AngularFirestore 
  ) {
  }

  displaymsg(){
      
  
    return  this.firestore.collection("messages" , ref => ref.orderBy('date') ).snapshotChanges()

    }

    getuser(id:Number){
      let api = `${this.endpoint}/user/${id}` ; 
      return this.http.get<Users>(api) ;
  
    }

    sendmsg(data){
      console.log(data) ;
        return new Promise<any>((resolve, reject) =>{
            this.firestore
                .collection("messages")
                .add(data)
                .then(res => {}, err => reject(err));
        });
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