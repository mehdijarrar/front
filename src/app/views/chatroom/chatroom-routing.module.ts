import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatroomComponent } from './chatroom.component';

const routes: Routes = [
  {
    path: '',
    component: ChatroomComponent,
    data: {
      title: 'Chatroom'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatroomRoutingModule {}