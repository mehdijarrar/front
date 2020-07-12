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
    
  goodslist : Goods[]=[] ; 
  public goods: Goods ;
  goodsForm : FormGroup;
  modifyForm : FormGroup ; 
  public mgoods : Goods ; 
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
