import { NgModule } from '@angular/core';


import { EventsListComponent } from './events-list.component';
import { EventsListRoutingModule } from './events-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from "ngx-bootstrap";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  imports: [ 
    
    CommonModule ,
    HttpClientModule,
    CKEditorModule,
    ReactiveFormsModule,
    EventsListRoutingModule,
    ModalModule.forRoot()
    
  ],
  declarations: [ EventsListComponent ]
})
export class EventsListModule { }
