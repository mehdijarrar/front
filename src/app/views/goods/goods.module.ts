import { NgModule } from '@angular/core';


import { GoodsComponent } from './goods.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    GoodsRoutingModule,
    CommonModule ,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot() ,
    
  ],
  declarations: [ GoodsComponent ]
})
export class GoodsModule { }
