import { NgModule } from '@angular/core';


import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule ,
    
    SigninRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ SigninComponent ]
})
export class SigninModule { }
