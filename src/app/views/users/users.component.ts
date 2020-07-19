import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';


import {Users} from '../../shared/models/users' ; 
import {UsersService} from './users.service' ; 




@Component({
  
  
  templateUrl: 'users.component.html',
 
})
export class UsersComponent implements OnInit  {
  userslist=[] ;
  startIndex = 0 ; 
  endIndex = 5; 
  pageindex = 1 ;

  constructor(public router: Router , public UsersService : UsersService ) { }

  deleteuser(a:number){
    for(let i=0 ; i< this.userslist.length ; i++){
      if(this.userslist[i].id === a){
        this.userslist.splice(i,1) ; 
      }

    }
    this.UsersService.Removeuser(a) ; 
  }

  updateindex(pageindex){
    this.pageindex = pageindex ; 
    this.startIndex = (pageindex-1)*5; 
    this.endIndex = this.startIndex + 5 ; 
    if(this.endIndex > this.userslist.length){
      this.endIndex = this.userslist.length ;
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

  ngOnInit() {

    this.UsersService.Allusers().pipe(first()).subscribe(
      userslist => { 
        this.userslist = userslist ; 
        console.log(this.userslist) ; 
      })

  }

}
