import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { EventComponent } from './event.component';
import { EventRoutingModule } from './event-routing.module';
import {CommonModule} from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  imports: [
   
    CommonModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    EventRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [ EventComponent ]
})
export class EventModule { }
