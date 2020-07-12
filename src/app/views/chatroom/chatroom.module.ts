import { NgModule } from '@angular/core';


import { ChatroomComponent } from './chatroom.component';
import { ChatroomRoutingModule } from './chatroom-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
   
    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    ChatroomRoutingModule,
    ModalModule.forRoot() ,
    
  ],
  declarations: [ ChatroomComponent ]
})
export class ChatroomModule { }
