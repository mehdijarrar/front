import {AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CollapseDirective} from 'ngx-bootstrap';
import {EventsService} from './event.service' ; 
import { first } from 'rxjs/operators';
import { createEvent } from '../../shared/models/createEvent' ; 
import { Router ,ActivatedRoute }  from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './../../shared/auth.service' ; 
import {GoodsService} from './../goods/goods.service' ; 
import {ServiceService} from './../service/service.service' ; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Goods} from './../../shared/models/goods' ; 
import {Goods_provided} from './../../shared/models/goods_provided' ;
import { Service } from '../../shared/models/service';
import {Service_provided} from './../../shared/models/service_provided' ;
import {Volunteer_provided} from './../../shared/models/volunteer_provided' ;
@Component({
  styleUrls: ['./event.component.css'] , 
  templateUrl: 'event.component.html'
})
export class EventComponent implements OnInit , AfterViewChecked {
  goods_provided : Goods_provided ; 
  volunteer_provided : Volunteer_provided ; 
  service_provided : Service_provided ; 
  goodsForm: FormGroup;
  serviceForm : FormGroup ; 
  moneyForm : FormGroup ; 


  @ViewChild('Dgoods') public Dgoods: ModalDirective;
  @ViewChild('Dservice') public Dservice: ModalDirective;
  @ViewChild('Dmoney') public Dmoney: ModalDirective;
 
  goodslist : Goods[]=[] ; 
  ngoods = [] ; 

  servicelist : Service[]=[] ; 
  nservice = [] ; 


  id: number;
  event : createEvent ; 

  private _isCollapsed: boolean = true;
  set isCollapsed(value) {
    this._isCollapsed = value;
  }
  get isCollapsed() {
    if (this.collapseRef) {
      // temp fix for "overflow: hidden"
      if (getComputedStyle(this.collapseRef.nativeElement).getPropertyValue('display') === 'flex') {
       this.renderer.removeStyle(this.collapseRef.nativeElement, 'overflow');
      }
    }
    return this._isCollapsed;
  }

  @ViewChild(CollapseDirective, { read: ElementRef, static: false }) collapse !: CollapseDirective;

  collapseRef;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    public EventsService : EventsService ,
    public AuthService : AuthService ,
    public GoodsService : GoodsService ,
    public ServiceService :ServiceService ,
  ) {
 
   }



  ngOnInit() {
   this.id= parseInt(this.route.snapshot.paramMap.get('id'))  ; 
     
   this.EventsService.events(this.id).pipe(first()).subscribe(
   event => { 
 
    this.event = event ; 
      })


      this.goodsForm = new FormGroup({

        'numberg': new FormControl(null, Validators.required),
        'select1' : new FormControl(null, Validators.required)
  
      })

      this.moneyForm = new FormGroup({

        'amount': new FormControl(null, Validators.required),
        
      })


      this.serviceForm = new FormGroup({

        'numbers': new FormControl(null, Validators.required),
        'select1' : new FormControl(null, Validators.required)
  
      })

  }

money(){

console.log(this.moneyForm.value.amount) ;

}


participate(){
  this.volunteer_provided = new Volunteer_provided() ; 
  this.volunteer_provided.volunteer_id = Number(localStorage.getItem('userid')); 
  this.volunteer_provided.event_id = this.id ;
  this.EventsService.participate(this.volunteer_provided) ; 
  
}


  donategoods(){

    this.ngoods =[] ;

    this.GoodsService.Allgoods().pipe(first()).subscribe(goodslist => { 
      this.goodslist = goodslist ; 
      console.log(this.goodslist) ;
      for( let gn of this.event.goods ){
        for(let gl of this.goodslist ){
          if(gn.goods_id === gl.id){
            const cell = {id:gl.id , description : gl.description } 
            this.ngoods.push(cell);


          }
          
        }

      }

    })

  }

  goodsprovided(){
    

    this.goods_provided = new Goods_provided() ; 
    this.goods_provided.event_id = this.id ; 
    this.goods_provided.provider_id = Number(localStorage.getItem('userid')); 
    this.goods_provided.goods_id =this.goodsForm.value.select1 ; 
    this.goods_provided.amount = this.goodsForm.value.numberg ; 
    console.log(this.goods_provided) ; 
    this.EventsService.donategoods(this.goods_provided) ; 
   
    
  }



  donateservice(){

    
   

    this.nservice =[] ;

    this.ServiceService.Allservice().pipe(first()).subscribe(servicelist => { 
      this.servicelist = servicelist ; 
      console.log(servicelist) ; 
      for( let sn of this.event.service ){
        for(let sl of this.servicelist ){
          if(sn.service_id === sl.id){
            const cell = {id:sl.id , description : sl.description } 
            this.nservice.push(cell);


          }
          
        }

      }

    })

  }

  serviceprovided(){
    

    this.service_provided = new Service_provided() ; 
    this.service_provided.event_id = this.id ; 
    this.service_provided.provider_id = Number(localStorage.getItem('userid')); 
    this.service_provided.service_id =this.serviceForm.value.select1 ; 
    this.service_provided.amount = this.serviceForm.value.numbers ; 
    console.log(this.service_provided) ; 
    this.EventsService.donateservice(this.service_provided) ; 
   
    
  }





  ngAfterViewChecked (): void {
    this.collapseRef = this.collapse;
  }
  }

