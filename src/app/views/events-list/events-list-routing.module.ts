import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsListComponent } from './events-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    data: {
      title: 'Events List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsListRoutingModule {}