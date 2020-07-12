import {AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CollapseDirective} from 'ngx-bootstrap';
import {HomeService} from './home.service' ; 
import { first } from 'rxjs/operators';
import { Event } from './../../shared/models/event';
import { Router , ActivatedRoute }  from '@angular/router';
import { AuthService } from './../../shared/auth.service' ;
import {EventUser} from './../../shared/models/EventUser' ; 
import {Preinfo} from './../../shared/models/preinfo' ; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Money_provided} from './../../shared/models/money_provided' ; 
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  styleUrls: ['./home.component.css'] , 
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit , AfterViewChecked {
@ViewChild('myModal') public myModal: ModalDirective;
moneyForm : FormGroup;
private test :boolean = false ; 
public Events : Event[] = []; 
public EventsUser : EventUser[] = []; 
public Preinfo : Preinfo ; 
public Money_provided : Money_provided ; 
public id : Number ; 

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
    private renderer: Renderer2,
    private route: ActivatedRoute,
    public HomeService : HomeService ,
    public AuthService : AuthService , 
  ) { }

  subscribe(a:Number){
    
    for( let eu of this.EventsUser ){
      if(eu.event.id === a){
        eu.preregistrated = true ; 
       
      }
    }
    this.Preinfo = new Preinfo() ; 
    this.Preinfo.event_id = a ;
    this.Preinfo.user_id = this.id ; 
    this.HomeService.subscribe(this.Preinfo) ; 
    console.log(this.Preinfo) ; 
    
  }
  donate_money(){
    this.Money_provided = new Money_provided() ; 
    this.Money_provided.event_id = -1 ; 
    this.Money_provided.provider_id = -1 ; 
    this.Money_provided.amount = this.moneyForm.value.amount ; 
    console.log(this.Money_provided) ; 
    this.HomeService.donatemoney(this.Money_provided) ; 
    this.myModal.hide() ; 
  }
  unsubscribe(a:Number){
   
    for( let eu of this.EventsUser ){
      if(eu.event.id === a){
        eu.preregistrated = false ; 
      }
    }
    this.Preinfo = new Preinfo() ; 
    this.Preinfo.event_id = a ;
    this.Preinfo.user_id = this.id ; 
    console.log(this.Preinfo) ; 
    this.HomeService.unsubscribe(this.Preinfo) ; 
    

  }


  public go(id) {
    if(this.AuthService.isLoggedIn ){
      if(this.AuthService.isSubscriber){
        this.router.navigate(['subscriber/event/', id]) ; 
      }else if(this.AuthService.isAdmin){
        this.router.navigate(['admin/event/', id]) ; 
      }
      else if(this.AuthService.isMember){
        this.router.navigate(['member/event/', id]) ; 
      }
      
    }else{
      this.router.navigate(['event/', id]) ; 
    }
    
    
}


  ngOnInit() {
    this.id = Number(localStorage.getItem('userid')); 
    if(this.AuthService.isLoggedIn ) {
        this.HomeService.eventsuser(this.id).pipe(first()).subscribe(
          events => { 
          this.EventsUser = events ;
          console.log(this.EventsUser);
          })
    }
    this.HomeService.events().pipe(first()).subscribe(
      events => { 
      this.Events = events ;
      console.log(this.Events);
      })

      this.moneyForm = new FormGroup({
        'amount' : new FormControl(null, Validators.required),  
      });
  }

  ngAfterViewChecked (): void {
    this.collapseRef = this.collapse;
  }

  }

