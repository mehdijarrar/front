import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import { ChatroomService } from './chatroom.service';

@Component({
  
  styleUrls: ['chatroom.style.css'] ,
  templateUrl: 'chatroom.component.html',
 
})
export class ChatroomComponent implements OnInit {

  constructor(public ChatroomService : ChatroomService,
    public router: Router ) { }




  ngOnInit() {
    
    

  }
}
