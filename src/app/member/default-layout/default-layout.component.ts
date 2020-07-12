import {Component , ViewChild, OnInit} from '@angular/core';
import { navItems } from '../../_nav2';
import { AuthService } from './../../shared/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberlayoutService } from './default-layout.service' ; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import { MessagingService } from './../../service/messaging.service' ; 

@Component({
  templateUrl: './default-layout.component.html'
})
export class MemberLayoutComponent implements OnInit {
  public id : Number ;
  
  @ViewChild('myModal') public myModal: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  message;
  constructor(public authService: AuthService , public MemberlayoutService: MemberlayoutService , public messagingService : MessagingService ) { }
  
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
  }
}
