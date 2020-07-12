import { NgModule } from '@angular/core';


import { PreregistrationComponent} from './preregistration.component';
import { PreregistrationRoutingModule } from './preregistration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
   
    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    PreregistrationRoutingModule,
    ModalModule.forRoot() ,
    
  ],
  declarations: [ PreregistrationComponent ]
})
export class PreregistrationModule { }
