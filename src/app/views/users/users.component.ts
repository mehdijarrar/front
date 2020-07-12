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
  constructor(public router: Router , public UsersService : UsersService ) { }

  deleteuser(a:number){
    for(let i=0 ; i< this.userslist.length ; i++){
      if(this.userslist[i].id === a){
        this.userslist.splice(i,1) ; 
      }

    }
    this.UsersService.Removeuser(a) ; 
  }

  ngOnInit() {

    this.UsersService.Allusers().pipe(first()).subscribe(
      userslist => { 
        this.userslist = userslist ; 
        console.log(this.userslist) ; 
      })

  }

}
