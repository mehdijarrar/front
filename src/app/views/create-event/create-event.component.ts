import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from './../../shared/models/event';
import { Service_needed } from './../../shared/models/service_needed';
import { Goods_needed } from './../../shared/models/goods_needed';
import { createEvent } from './../../shared/models/createEvent' ;
import {  EventService } from './create-event.service' ; 
import { first } from 'rxjs/operators';
import * as InlineEditor from '@ckeditor/ckeditor5-build-classic';





@Component({
  
  templateUrl: 'create-event.component.html',

})



export class CreateEventComponent implements OnInit {
  public Editor = InlineEditor;



  selectedFile: File;
  slist = [] ; 
  glist = [] ; 
  service = [] ;
  goods = [] ; 
  gselected = [] ; 
  sselected = [] ; 
 createEventForm: FormGroup;

onFileChanged(event) {
  //Select File
  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile) ; 
}


 add_goods (){
   const cell = {id:null, event_id:null, goods_id:this.createEventForm.value.select2.id , amount:this.createEventForm.value.amount_goods}
   this.goods.push(cell);
   const cell1 = {id : this.createEventForm.value.select2.id , description : this.createEventForm.value.select2.description , amount : this.createEventForm.value.amount_goods }
   this.gselected.push(cell1) ; 
   console.log(this.createEventForm.value.description) ;
   
 }


  add_service (){
    const cell = {id:null, event_id:null, service_id:this.createEventForm.value.select1.id , amount:this.createEventForm.value.amount_service }
    this.service.push(cell);
    const cell1 = {id : this.createEventForm.value.select1.id , description : this.createEventForm.value.select1.description , amount : this.createEventForm.value.amount_service }
    this.sselected.push(cell1) ; 
  }


   // create event
   create() {
    const uploadImageData = new FormData();
    uploadImageData.append('File', this.selectedFile);
    console.log(uploadImageData.append) ; 

    
    this.event = new Event() ; 
    this.event.date = this.createEventForm.value.date ; 
    this.event.title = this.createEventForm.value.title ; 
    this.event.description = this.createEventForm.value.description ;
    this.event.place = this.createEventForm.value.place ;
    this.event.volunteers_needed = this.createEventForm.value.volunteers_needed ;
    this.event.money_needed = this.createEventForm.value.money_needed ;
    this.event.userid = Number(localStorage.getItem('userid')) ;


    this.createevent = new createEvent() ; 
    
    this.createevent.event = this.event ; 
    this.createevent.goods = this.goods ; 
    this.createevent.service = this.service ; 
   
    uploadImageData.append('createevent', JSON.stringify(this.createevent) );
    

    this.EventService.AddEvent( uploadImageData ) ; 
   

      
  }


ngOnInit() {

  this.EventService.Allservice().pipe(first()).subscribe(servicelist => { 
    this.slist = servicelist ; 
    
  })

  this.EventService.Allgoods().pipe(first()).subscribe(goodslist => { 
  
    this.glist = goodslist ; 
    
  })

 
    this.createEventForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'place': new FormControl(null, Validators.required),
      'volunteers_needed': new FormControl(null, Validators.required),
      'date' : new FormControl(null , Validators.required) , 
      'money_needed' : new FormControl(null, Validators.required),
      'select1' : new FormControl(this.slist[1], Validators.required),
      'select2' : new FormControl(this.glist[1],Validators.required ),
      'amount_service' : new FormControl(null, Validators.required),
      'amount_goods' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
    });
}
public event: Event;
public goods_needed: Goods_needed;
public service_needed: Service_needed;
public createevent: createEvent ;  
constructor(public EventService : EventService) {}

  
 
}
