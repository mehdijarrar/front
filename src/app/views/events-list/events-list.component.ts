import { Component, OnInit , ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Eventlist} from './../../shared/models/eventlist'
import {ModalDirective} from 'ngx-bootstrap/modal';
import {createEvent} from './../../shared/models/createEvent' ; 
import {Goods_needed} from './../../shared/models/goods_needed' ; 
import {Service_needed} from './../../shared/models/service_needed' ;
import { Event } from './../../shared/models/event';
import * as InlineEditor from '@ckeditor/ckeditor5-build-classic';



import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';

import {EventListService} from './events-list.service'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { from } from 'rxjs';
@Component({
  
  
  templateUrl: 'events-list.component.html',
 
})
export class EventsListComponent implements OnInit   {
  public Editor = InlineEditor;
  public editorData = '';
  @ViewChild('largeModal') public largeModal: ModalDirective;
  public event: Event;
  public goods_needed: Goods_needed;
  public service_needed: Service_needed;
  public createevent: createEvent ;  
  slist = [] ; 
  glist = [] ; 
  service = [] ;
  goods = [] ; 
  gselected = [] ; 
  sselected = [] ; 
  eventslist: Eventlist[]=[]  ; 
  CreateEvent : createEvent ; 
  createEventForm: FormGroup;
  description : String ; 



  startIndex = 0 ; 
  endIndex = 5; 
  pageindex = 1 ;


constructor(public EventListService : EventListService,
    public router: Router  ) { }


    public onChange( { editor }: ChangeEvent ) {
      const data = editor.getData();

     
      this.description=data ; 
  }
   

  updateindex(pageindex){
    this.pageindex = pageindex ; 
    this.startIndex = (pageindex-1)*5; 
    this.endIndex = this.startIndex + 5 ; 
    if(this.endIndex > this.eventslist.length){
      this.endIndex = this.eventslist.length ;
    }
  }
  
  getArrayFromNumber(length){
    if(length/5 > Math.floor(length/5) ) {
      return new Array(Math.floor(length/5) + 1 )
    }
    else{
      return new Array(Math.floor(length/5))
    }
  }

    ngOnInit() {

  

      this.event = new Event() ; 
      this.event =null ;

        this.EventListService.Allevents().pipe(first()).subscribe(
          eventslist => { 
          this.eventslist = eventslist ; 
          console.log(this.eventslist)
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

          this.EventListService.Allservice().pipe(first()).subscribe(servicelist => { 
            this.slist = servicelist ; 
            
          })

        
        
          this.EventListService.Allgoods().pipe(first()).subscribe(goodslist => { 
          
            this.glist = goodslist ; 
            
          })
 

        }

        add_goods (){
          const cell = {id:null, event_id:null, goods_id:this.createEventForm.value.select2.id , amount:this.createEventForm.value.amount_goods}
          this.goods.push(cell);
          const cell1 = {id : this.createEventForm.value.select2.id , description : this.createEventForm.value.select2.description , amount : this.createEventForm.value.amount_goods }
          this.gselected.push(cell1) ;  
        }
       
       
         add_service (){
           const cell = {id:null, event_id:null, service_id:this.createEventForm.value.select1.id , amount:this.createEventForm.value.amount_service }
           this.service.push(cell);
           const cell1 = {id : this.createEventForm.value.select1.id , description : this.createEventForm.value.select1.description , amount : this.createEventForm.value.amount_service }
           this.sselected.push(cell1) ; 
         }
         delete_service(s){
          
           for(let i=0 ; i< this.sselected.length ; i++){
            
             if(this.sselected[i].id === s.id ){
                this.sselected.splice(i,1) ;
                console.log("yes");

             }

           }

           for(let i=0 ; i< this.service.length ; i++){
            if(this.service[i].service_id === s.id ){
               this.service.splice(i,1) ; 

            }

          }

         }

         delete_goods(g){
          
          for(let i=0 ; i< this.gselected.length ; i++){
           
            if(this.gselected[i].id === g.id ){
               this.gselected.splice(i,1) ;
               console.log("yes");

            }

          }

          for(let i=0 ; i< this.goods.length ; i++){
           if(this.goods[i].goods_id === g.id ){
              this.goods.splice(i,1) ; 

           }

         }

        }
         
    modifyevent(a:number){
     this.EventListService.showevent(a).pipe(first()).subscribe( e => {
       console.log(e) ;
        this.CreateEvent = e ; 
        this.event = e.event ; 
        this.editorData =JSON.stringify( this.event.description) ; 
        
      this.service = [] ; 
      this.sselected = [] ;
      this.goods = [] ; 
      this.gselected = [] ;

       for( let sn of this.CreateEvent.service ){
         for(let s of this.slist ){
          if(sn.service_id === s.id ){
            const cell = {id:null, event_id:null, service_id:s.id  , amount:sn.amount }
           this.service.push(cell);
           const cell1 = {id : s.id , description : s.description , amount : sn.amount }
           this.sselected.push(cell1) ; 
          }

         }
       }
       for( let gn of this.CreateEvent.goods ){
        for(let g of this.glist ){
         if(gn.goods_id === g.id ){
           const cell = {id:null, event_id:null, goods_id:g.id  , amount:gn.amount }
          this.goods.push(cell);
          const cell1 = {id : g.id , description : g.description , amount : gn.amount }
          this.gselected.push(cell1) ; 
         }

        }
      }

     }) 
 


    }

    saveupdate(){
     if(this.createEventForm.value.date !== null ){
      this.event.date = this.createEventForm.value.date ; 
     }
    

    if(this.createEventForm.value.title !== null){
      this.event.title = this.createEventForm.value.title ; 
    }
    if(this.createEventForm.value.place !== null){
      this.event.place = this.createEventForm.value.place ;
    }
    if(this.createEventForm.value.volunteers_needed !== null){this.event.volunteers_needed = this.createEventForm.value.volunteers_needed ;}
    if (this.createEventForm.value.money_needed !== null){this.event.money_needed = this.createEventForm.value.money_needed ;}
    
    this.event.userid = Number(localStorage.getItem('userid')) ;


    this.createevent = new createEvent() ; 
    this.createevent.event = this.event ; 
    this.createevent.event.description = this.description ;
    this.createevent.goods = this.goods ; 
    this.createevent.service = this.service ; 
   
   this.EventListService.modifyevent(this.createevent) ; 
    this.largeModal.hide()
   window.location.reload() ; 
    
    }

    deleteevent(a : number){
      
        this.EventListService.Removeevent(a) ; 
        for(let i=0 ; i< this.eventslist.length ; i++){
           if(this.eventslist[i].id === a ){
             this.eventslist.splice(i,1) ; 
           }
        }
    }
    

}

