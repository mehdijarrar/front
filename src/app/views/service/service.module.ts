import { NgModule } from '@angular/core';


import { ServiceComponent } from './service.component';
import { ServiceRoutingModule } from './service-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
   
    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceRoutingModule,
    ModalModule.forRoot() ,
    
  ],
  declarations: [ ServiceComponent ]
})
export class ServiceModule { }
