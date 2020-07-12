import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ConfirmDonationService } from './confirm-donation.service' ; 
import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import {Unconfirmed_donation} from './../../shared/models/unconfirmed_donation'
import {Unconfirmed_service} from './../../shared/models/unconfirmed_service'
import {Unconfirmed_goods} from './../../shared/models/unconfirmed_goods'
@Component({
  
  
  templateUrl: 'confirm-donation.component.html',
 
})
export class ConfirmDonationComponent implements OnInit {
  unconfirmed_donation : Unconfirmed_donation ; 
  service : Unconfirmed_service[]=[] ; 
  goods : Unconfirmed_goods[]=[] ;
  constructor(public ConfirmService : ConfirmDonationService,
    public router: Router ) { }

deleteservice(a:number){
  this.ConfirmService.Removeservice(a) ;
  for(let i=0 ; i< this.service.length ; i++){
    if(this.service[i].id === a){
      this.service.splice(i,1) ; 
    }
 } 
 
}
confirmservice(a:number){
  this.ConfirmService.Confirmservice(a) ; 
  for(let i=0 ; i< this.service.length ; i++){
    if(this.service[i].id === a){
      this.service.splice(i,1) ; 
    }
 } 

}


deletegoods(a:number){
  this.ConfirmService.Removegoods(a) ;
  for(let i=0 ; i< this.goods.length ; i++){
    if(this.goods[i].id === a){
      this.goods.splice(i,1) ; 
    }
 } 
 
}
confirmgoods(a:number){
  this.ConfirmService.Confirmgoods(a) ; 
  for(let i=0 ; i< this.goods.length ; i++){
    if(this.goods[i].id === a){
      this.goods.splice(i,1) ; 
    }
 } 

}



  ngOnInit() {
    
    this.ConfirmService.Alldonations().pipe(first()).subscribe(res => { 
      this.unconfirmed_donation = res ; 
      this.service = this.unconfirmed_donation.unconfirmed_service ; 
      this.goods = this.unconfirmed_donation.unconfirmed_goods ; 
     
    })

   

  }
}
