import { NgModule } from '@angular/core';


import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }
