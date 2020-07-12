import {Component , ViewChild, OnInit} from '@angular/core';
import { navItems } from '../../_nav1';
import { AuthService } from './../../shared/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DlayoutService } from './default-layout.service' ; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Goods} from './../../shared/models/goods'
import { Disnotif } from './../../shared/models/disnotif' ;
import { Numbernotif } from './../../shared/models/numbernotif' ;

@Component({
  templateUrl: './default-layout.component.html'
})
export class DLayoutComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  good : Goods ;
  userid: number ; 
  notiflist : Disnotif[]=[] ; 
  numbernotif : Numbernotif ; 
   i : number = 0 ; 
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(public authService: AuthService , public dlayoutService: DlayoutService ) { }
  message;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  a(){


    this.dlayoutService.updatenumber() ; 
    
  }
  donate(){
    console.log("hi") ; 
  }
  testnotif(){    
    let data = {
      description:'aaaaaaaaaaaaa',
      userid:11 
    } 
    this.dlayoutService.createCoffeeOrder(data).then(res => {
      console.log(res) 
    })
  }
 
  logout() {
    this.authService.doLogout()
  }
  ngOnInit() {
    this.userid = Number(localStorage.getItem('userid')); 
    this.dlayoutService.displaynotif(this.userid).snapshotChanges().subscribe((res : any) => {
      this.i=0 ; 
      this.notiflist =[] ; 
      res.map( a => {  
      this.notiflist[this.i] = a.payload.doc.data() ; 
      console.log( a.payload.doc.data() ) ; 
      this.i = this.i + 1 ; 
      
   })

    } ) ;
    this.dlayoutService.numbernotif().snapshotChanges().subscribe((res : any) => {
       
     this.numbernotif = null ; 
      res.map( a => {  
      this.numbernotif = a.payload.doc.data() ;  
   })
   } )  ;

  }


}
