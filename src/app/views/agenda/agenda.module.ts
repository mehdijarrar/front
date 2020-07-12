import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgendaComponent } from './agenda.component';
import {AgendaRoutingModule} from './agenda-routing.module'

@NgModule({
  imports: [
    FullCalendarModule ,
    CommonModule,
    AgendaRoutingModule,
    FormsModule,
   
  ],
  declarations: [AgendaComponent],
  exports: [AgendaComponent],
})
export class AgendaModule {}
