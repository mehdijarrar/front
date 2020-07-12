import {Component , ViewChild, OnInit} from '@angular/core';
import { navItems } from '../../_nav2';
import { AuthService } from './../../shared/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberlayoutService } from './default-layout.service' ; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import { MessagingService } from './../../service/messaging.service' ; 
import { Disnotif } from './../../shared/models/disnotif' ;
import { Numbernotif } from './../../shared/models/numbernotif' ;
@Component({
  templateUrl: './default-layout.component.html'
})
export class MemberLayoutComponent implements OnInit {
  public id : Number ;
  notiflist : Disnotif[]=[] ; 
  numbernotif : Numbernotif ; 
   i : number = 0 ; 

  @ViewChild('myModal') public myModal: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  message;
  constructor(public authService: AuthService , public MemberlayoutService: MemberlayoutService , public messagingService : MessagingService ) { }
  

  a(){

    this.id = Number(localStorage.getItem('userid'));
    this.MemberlayoutService.updatenumber(this.id) ; 
    
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  donate(){
    console.log("hi") ; 
  }
  logout() {
    this.authService.doLogout()
  }
  ngOnInit() {
    this.id = Number(localStorage.getItem('userid')); 
    this.messagingService.requestPermission(this.id) ;  
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

     
    this.MemberlayoutService.displaynotif(this.id).snapshotChanges().subscribe((res : any) => {
      this.i=0 ; 
      this.notiflist =[] ; 
      res.map( a => {  
      this.notiflist[this.i] = a.payload.doc.data() ; 
      console.log( a.payload.doc.data() ) ; 
      this.i = this.i + 1 ; 
      
   })

    } ) ;
    this.MemberlayoutService.numbernotif(this.id).snapshotChanges().subscribe((res : any) => {
       
     this.numbernotif = null ; 
      res.map( a => {  
      this.numbernotif = a.payload.doc.data() ;  
   })
   } )  ;



  }
}
