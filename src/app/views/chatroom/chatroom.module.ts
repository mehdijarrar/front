import { NgModule } from '@angular/core';




import { ChatroomComponent } from './chatroom.component';
import { ChatroomRoutingModule } from './chatroom-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';




import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../../../environments/environment';
import { AsyncPipe } from '../../../../node_modules/@angular/common';

@NgModule({
  imports: [
   
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),

    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    ChatroomRoutingModule,
    ModalModule.forRoot() ,
    
  ],
  declarations: [ ChatroomComponent ]
})
export class ChatroomModule { }
