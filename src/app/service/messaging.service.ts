import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {NotifToken} from './../shared/models/notiftoken' ; 

@Injectable()
export class MessagingService {
    endpoint: string = 'http://localhost:8083';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    NotifToken : NotifToken ; 
currentMessage = new BehaviorSubject(null);
constructor(private angularFireMessaging: AngularFireMessaging , private http: HttpClient,
    public router: Router) {
this.angularFireMessaging.messaging.subscribe(
(_messaging) => {
_messaging.onMessage = _messaging.onMessage.bind(_messaging);
_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
}
)
}
requestPermission(id:Number) {
this.angularFireMessaging.requestToken.subscribe(
(token) => {
    this.NotifToken = new NotifToken() ;  
    this.NotifToken.token = token ; 
    this.NotifToken.user_id = id ; 
   // console.log(id) ;
       // console.log(this.NotifToken);
        let api = `${this.endpoint}/Addnotiftoken` ; 
    return this.http.post<NotifToken>(api,this.NotifToken).subscribe() ;
},
(err) => {
console.error('Unable to get permission to notify.', err);
}
);
}
receiveMessage() {
this.angularFireMessaging.messages.subscribe(
(payload) => {
console.log("new message received. ", payload);
this.currentMessage.next(payload);
})
}
}