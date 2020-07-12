import { NgModule } from '@angular/core';


import { CreateEventComponent } from './create-event.component';
import { CreateEventRoutingModule } from './create-event-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CKEditorModule,
    FormsModule,
    CommonModule ,
    HttpClientModule,
    CreateEventRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ CreateEventComponent ]
})
export class CreateEventModule { }
