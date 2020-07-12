import { Component , OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AgendaService } from './agenda.service' ;
import { Router }  from '@angular/router';
import { first } from 'rxjs/operators';
import {Agenda} from './../../shared/models/agendadto' ; 
import { EventInput } from '@fullcalendar/core';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';


@Component({
  selector: 'app-root',
  templateUrl: './agenda.component.html',

})
export class AgendaComponent implements OnInit {
  agendalist : Agenda[]=[] ; 

  constructor(public AgendaService : AgendaService,
    public router: Router ) { } 

  calendarPlugins = [dayGridPlugin]; // important!
  
  calendarEvents: EventInput[] = [
    //{ title: 'Event Now', start: new Date() }
  ];
  
  ngOnInit() {

    this.AgendaService.Myagenda(Number(localStorage.getItem('userid'))).pipe(first()).subscribe( e => {
      this.agendalist = e ;

      for(let a of this.agendalist){

        
     

         this.calendarEvents = this.calendarEvents.concat({ 
           title : String( a.title) ,  start: new Date(a.date)
          
          } )
         
           
         
     } 
    

      
    })
    
  }
}