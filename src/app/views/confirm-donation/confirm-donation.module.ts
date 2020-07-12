import { NgModule } from '@angular/core';


import { ConfirmDonationComponent } from './confirm-donation.component';
import { ConfirmDonationRoutingModule } from './confirm-donation-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
   
    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmDonationRoutingModule,
    ModalModule.forRoot() ,
    
  ],
  declarations: [ ConfirmDonationComponent ]
})
export class ConfirmDonationModule { }
