import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class MemberlayoutService {
    endpoint: string = 'http://localhost:8083';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  
    constructor(
      private http: HttpClient,
      public router: Router,
      private firestore: AngularFirestore 
    ) {
    }
    
    updatenumber(id:Number){

      this.firestore.collection("numbernotif").ref.where("userid", "==", id)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              doc.ref.update({number: 0});
              
          });
     })
    }
        createCoffeeOrder(data) {
          return new Promise<any>((resolve, reject) =>{
              this.firestore
                  .collection("notif")
                  .add(data)
                  .then(res => {}, err => reject(err));
          });
      }
    
      
      displaynotif(userid : Number){
          
      
      return  this.firestore.collection("notif"  ,  
        ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          { query = query.where('userid', '==', userid) };
          
          return query;
      })
      }
    
    
      numbernotif(id : Number){
          
      
        return  this.firestore.collection("numbernotif"  ,  
          ref => {
            let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            { query = query.where('userid', '==', id) };
            
            return query;
        })
        }


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