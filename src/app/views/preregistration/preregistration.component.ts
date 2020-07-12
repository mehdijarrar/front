import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PreregistrationService } from './preregistration.service' ; 
import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Preregistration } from '../../shared/models/preregistration' ; 
import { notif } from '../../shared/models/notif' ; 
import { notification } from '../../shared/models/notification' ; 
import { testService } from './test.service' ; 
@Component({
  
  
  templateUrl: 'preregistration.component.html',
 
})
export class PreregistrationComponent implements OnInit {
 notif : notif ; 
 notification : notification ; 
  prelist : Preregistration[]=[] ; 

  constructor(public PreregistrationService : PreregistrationService, public testService:testService ,
    public router: Router ) { }



    deletepre(a:number){
      this.PreregistrationService.delete(a) ; 
      for(let i=0 ; i< this.prelist.length ; i++){
        if(this.prelist[i].id === a){
          this.prelist.splice(i,1) ; 
      }
     } 
    }

    reminder(p:Preregistration){
      for(let i=0 ; i< p.tokens.length ; i++){
        this.notif = new notif ; 
        this.notification = new notification ; 
        this.notification.body ="this is a reminder to paticipate " + "'" + p.event_title + "'" +" event " ; 
        this.notification.title =  p.event_title +" event "; 
       
         
        this.notif.to = p.tokens[i] ; 
        this.notif.notification = this.notification ; 
        console.log(this.notif) ; 
      //  this.PreregistrationService.push(this.notification)
        this.testService.push(this.notif)
        //.subscribe((res: any) => { console.log(res)  ; }); 

      }
      let data = {
        description: "this is a reminder to paticipate " + "'" + p.event_title + "'" +" event " ,
        userid: p.userid
      } 

      this.testService.addnotif(data) ; 
      this.testService.numberofnotif(p.userid)

    }
  

  ngOnInit() {
    this.PreregistrationService.Allpreregistration().pipe(first()).subscribe(prelist => { 
      this.prelist = prelist ; 
      console.log(this.prelist) ; 
    })
    
  }
}
