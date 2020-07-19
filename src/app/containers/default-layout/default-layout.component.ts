import {Component, ViewChild, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from './../../shared/auth.service';


import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminlayoutService } from './default-layout.service' ; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import { MessagingService } from './../../service/messaging.service' ; 
import { Disnotif } from './../../shared/models/disnotif' ;
import { Numbernotif } from './../../shared/models/numbernotif' ;

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {

  public id : Number ;
  notiflist : Disnotif[]=[] ; 
  numbernotif : Numbernotif ; 
   i : number = 0 ; 


  public sidebarMinimized = false;
  public navItems = navItems;
  message;
  constructor(public authService: AuthService,  public AdminlayoutService: AdminlayoutService , public messagingService : MessagingService ) { }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authService.doLogout()
  }
  a(){

    this.id = Number(localStorage.getItem('userid'));
    this.AdminlayoutService.updatenumber(this.id) ; 
    
  }
  ngOnInit() {
    this.id = Number(localStorage.getItem('userid')); 
    this.messagingService.requestPermission(this.id) ;  
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

     
    this.AdminlayoutService.displaynotif(this.id).snapshotChanges().subscribe((res : any) => {
      this.i=0 ; 
      this.notiflist =[] ; 
      res.map( a => {  
      this.notiflist[this.i] = a.payload.doc.data() ; 
      console.log( a.payload.doc.data() ) ; 
      this.i = this.i + 1 ; 
      
   })

    } ) ;
    this.AdminlayoutService.numbernotif(this.id).snapshotChanges().subscribe((res : any) => {
       
     this.numbernotif = null ; 
      res.map( a => {  
      this.numbernotif = a.payload.doc.data() ;  
   })
   } )  ;



  }

}
