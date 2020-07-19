import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Service } from './../../shared/models/service' ;
import { ServiceService } from './service.service' ; 
import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  
  
  templateUrl: 'service.component.html',
 
})
export class ServiceComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;

  constructor(public ServiceService : ServiceService,
    public router: Router ) { }

    startIndex = 0 ; 
    endIndex = 5; 
    pageindex = 1 ;


  servicelist : Service[]=[] ; 
  public service : Service ;
  serviceForm : FormGroup;
  modifyForm : FormGroup ; 
   public mservice : Service ; 



   updateindex(pageindex){
    this.pageindex = pageindex ; 
    this.startIndex = (pageindex-1)*5; 
    this.endIndex = this.startIndex + 5 ; 
    if(this.endIndex > this.servicelist.length){
      this.endIndex = this.servicelist.length ;
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
      this.mservice = a ; 
      console.log(this.mservice) ; 
    }
    saveupdate(){
      if(this.modifyForm.value.modifydescription !== null )
      {this.mservice.description = this.modifyForm.value.modifydescription ; }
      
       this.ServiceService.ModifyService(this.mservice).subscribe((res: any) => {
     
        console.log(res) ; 
      });   
      this.myModal.hide() ; 
    }

  Add(){

    if((this.endIndex === this.servicelist.length) && ((this.endIndex - this.startIndex) < 5)  ) {
      this.endIndex = this.endIndex + 1 ;
     } 
    this.service = new Service ;    
    this.service.description = this.serviceForm.value.description ; 
    this.service.id = null ;
    this.ServiceService.AddService(this.service).subscribe((res: any) => {
     
      this.servicelist.push(res) ; 
    });  
  }
  deleteservice(a:number){

    this.ServiceService.Removeservice(a) ; 
     for(let i=0 ; i< this.servicelist.length ; i++){
        if(this.servicelist[i].id === a){
          this.servicelist.splice(i,1) ; 
        }
     } 
  }
  ngOnInit() {
    this.serviceForm = new FormGroup({
      'description' : new FormControl(null, Validators.required),  
    });
    this.modifyForm = new FormGroup({
      'modifydescription' : new FormControl(null,Validators.required) ,
    })
    this.ServiceService.Allservice().pipe(first()).subscribe(servicelist => { 
      this.servicelist = servicelist ; 
    })
  }
}
