import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import { ChatroomService } from './chatroom.service';
import { Message } from './../../shared/models/message' ;
import { Users } from './../../shared/models/users' ;
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';

@Component({
  
  styleUrls: ['chatroom.style.css'] ,
  templateUrl: 'chatroom.component.html',
 
})
export class ChatroomComponent implements OnInit {

  constructor(public ChatroomService : ChatroomService,
    public router: Router ) { }
    user : Users ; 
    id : Number ; 
   
    messagelist : Message[] = [] ; 
  msgForm : FormGroup;
    sendmsg(){
      var date = new Date() 
      let data = {
        date: date,
        name: this.user.firstname + " " + this.user.lastname , 
        msg : this.msgForm.value.msg

      } 
    this.ChatroomService.sendmsg(data).then(res => {
      console.log(res) 
    }) ;
        
    }
  

  ngOnInit() {
      this.msgForm = new FormGroup({
      'msg' : new FormControl(null, Validators.required),  
    });
    this.id = Number(localStorage.getItem('userid')); 
    this.ChatroomService.getuser(this.id).subscribe(res =>{
      this.user = res ;
    }); 

    this.ChatroomService.displaymsg().subscribe((res : any) => {
       
      this.messagelist = [] ; 
      var i = 0 ;   
       res.map( a => {  
      this.messagelist[i] = a.payload.doc.data() ; 
      i = i + 1 ; 
       console.log(this.messagelist) 
    }) ; 

  })
}
}
