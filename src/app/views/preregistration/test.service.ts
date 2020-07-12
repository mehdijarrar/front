import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Numbernotif } from './../../shared/models/numbernotif' ;

import { notif } from '../../shared/models/notif' ;
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})

export class testService {
 
  numbernotif : Numbernotif ; 
  
    key = 'AAAAVgzO1YU:APA91bGrvL2yrG5of_MXymxNbRUowFZIa-dgGn8q2hOqr9CgOgMZUBjjQeP6Dg2pHD-7lkUVjJm255DgWLWyyCZ-M010za8LYZIlmoLr7m8fAUvBE3RYDMEzCARSEiCdbOXFZJp7HG9M' ; 
    endpoint: string = 'https://fcm.googleapis.com/fcm/send';
   headers = new HttpHeaders().set('authentication', 'key='+this.key).set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router , 
    private firestore: AngularFirestore 

  ) {
  }

  push(notif : notif) {

    
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
  
    xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
    xhr.setRequestHeader("Authorization", "key=AAAAVgzO1YU:APA91bGrvL2yrG5of_MXymxNbRUowFZIa-dgGn8q2hOqr9CgOgMZUBjjQeP6Dg2pHD-7lkUVjJm255DgWLWyyCZ-M010za8LYZIlmoLr7m8fAUvBE3RYDMEzCARSEiCdbOXFZJp7HG9M");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send( JSON.stringify(notif));

    
    
   // let api = `${this.endpoint}`;

  // return  this.http.post<notif>(api, notif ,{headers : this.headers})
  
  }

  addnotif(data){


    
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("notif")
          .add(data)
          .then(res => {}, err => reject(err));
  });  
  }

  numberofnotif(id:Number){

   
    this.firestore.collection("numbernotif").ref.where("userid", "==", id)
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        doc.ref.update({number: firestore.FieldValue.increment(1) });
        
    });
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