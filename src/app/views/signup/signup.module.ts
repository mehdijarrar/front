import { NgModule } from '@angular/core';


import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule ,
    
    SignupRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ SignupComponent ]
})
export class SignupModule { }
