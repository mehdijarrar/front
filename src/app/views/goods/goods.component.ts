import { Component, OnInit ,ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Goods } from './../../shared/models/goods' ;
import { GoodsService } from './goods.service' ; 
import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  templateUrl: 'goods.component.html',
})
export class GoodsComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
 
  constructor(public GoodsService : GoodsService,
    public router: Router ) { }
    
    startIndex = 0 ; 
    endIndex = 5; 
    pageindex = 1 ; 

  goodslist : Goods[]=[] ; 
  public goods: Goods ;
  goodsForm : FormGroup;
  modifyForm : FormGroup ; 
  public mgoods : Goods ; 

updateindex(pageindex){
  this.pageindex = pageindex ; 
  this.startIndex = (pageindex-1)*5; 
  this.endIndex = this.startIndex + 5 ; 
  if(this.endIndex > this.goodslist.length){
    this.endIndex = this.goodslist.length ;
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

  modifypop(a){
    this.mgoods = a ; 
    console.log(this.mgoods) ; 
  }

  saveupdate(){
    if(this.modifyForm.value.modifydescription !== null )
    {this.mgoods.description = this.modifyForm.value.modifydescription ; }
    
     this.GoodsService.ModifyService(this.mgoods).subscribe((res: any) => {
   
      console.log(res) ; 
    });   
    this.myModal.hide() ; 
  }


  Add(){
   if((this.endIndex === this.goodslist.length) && ((this.endIndex - this.startIndex) < 5)  ) {
    this.endIndex = this.endIndex + 1 ;
   } 
    this.goods = new Goods ;    
    this.goods.description = this.goodsForm.value.description ; 
    this.goods.id = null ;
    this.GoodsService.AddGoods(this.goods).subscribe((res: any) => {
     
      this.goodslist.push(res) ; 
    });  
  }
  deletegoods(a:number){

    this.GoodsService.Removegoods(a) ; 
     for(let i=0 ; i< this.goodslist.length ; i++){
        if(this.goodslist[i].id === a){
          this.goodslist.splice(i,1) ; 
        }
     } 
  }
  ngOnInit() {


    this.goodsForm = new FormGroup({
      'description' : new FormControl(null, Validators.required),  
    });

    this.modifyForm = new FormGroup({
      'modifydescription' : new FormControl(null,Validators.required) ,
    })
    
    this.GoodsService.Allgoods().pipe(first()).subscribe(goodslist => { 
      this.goodslist = goodslist ; 
    })
  }
  
}
