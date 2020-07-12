import { NgModule } from '@angular/core';


import { DLayoutComponent } from './default-layout.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  imports: [
   
    CommonModule ,
    HttpClientModule,
    
    
  ],
  declarations: [ DLayoutComponent ], 
  providers: [],
})
export class DlayoutModule { }
