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

  startIndex = 0 ; 
  endIndex = 5; 
  pageindex = 1 ;

  startIndex2 = 0 ; 
  endIndex2 = 5; 
  pageindex2 = 1 ;





  constructor(public ConfirmService : ConfirmDonationService,
    public router: Router ) { }



    updateindex(pageindex){
      this.pageindex = pageindex ; 
      this.startIndex = (pageindex-1)*5; 
      this.endIndex = this.startIndex + 5 ; 
      if(this.endIndex > this.service.length){
        this.endIndex = this.service.length ;
      }
    }


    updateindex2(pageindex){
      this.pageindex2 = pageindex ; 
      this.startIndex2 = (pageindex-1)*5; 
      this.endIndex2 = this.startIndex2 + 5 ; 
      if(this.endIndex2 > this.goods.length){
        this.endIndex2 = this.goods.length ;
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
