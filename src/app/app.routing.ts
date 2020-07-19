import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// Import Containers
import { AdminLayoutComponent } from './containers';
import { DLayoutComponent } from './container';
import { MemberLayoutComponent } from './member';
import { EventComponent } from './views/event/event.component' ;  
import { HomeComponent} from'./views/home/home.component' ; 
import {AgendaComponent} from './views/agenda/agenda.component'
import { AuthGuard } from "./shared/auth.guard";

import { SubGuard } from "./shared/subscriber.guard";
import { MemberGuard } from "./shared/member.guard";
import { HomeGuard } from "./shared/home.guard";

export const routes: Routes = [
  
  {
    path: 'event/:id',
    component : EventComponent ,
    pathMatch: 'full',
  },
  
  {
    path: '',
    component : HomeComponent,
    canActivate : [HomeGuard] ,
  },
  
 
  {
    path: 'register',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'subscriber',
    component: DLayoutComponent,
    canActivate : [SubGuard] , 
    data: {
      title: 'Home'
    },
    
    children: [
      
     
  
      
        { path: 'home', component: HomeComponent },
        
        {path: 'event/:id',component : EventComponent ,loadChildren: () => import('./views/event/event.module').then(m => m.EventModule)},
        {path: 'agenda', component: AgendaComponent},
        
      
        {
        path: 'chatroom',
        loadChildren: () => import('./views/chatroom/chatroom.module').then(m => m.ChatroomModule)
        }
    ]

  },


  {
    path: 'member',
    component: MemberLayoutComponent,
    canActivate : [MemberGuard] , 
    data: {
      title: 'Home'
    },
    
    children: [
      
     
  
      
        { path: 'home', component: HomeComponent },
        
        {path: 'event/:id',component : EventComponent ,loadChildren: () => import('./views/event/event.module').then(m => m.EventModule)},
        {path: 'agenda', component: AgendaComponent},
    ]

  },

  {
    path: 'admin',
    canActivate: [AuthGuard] ,
    component: AdminLayoutComponent,
    
    
    data: {
      title: 'Home'
    },
    
    children: [
      
     
  
      {
        path: 'create-event',
        loadChildren: () => import('./views/create-event/create-event.module').then(m => m.CreateEventModule)
        
      },

      {
        path: 'events-list',
        loadChildren: () => import('./views/events-list/events-list.module').then (m => m.EventsListModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then (m => m.UsersModule)
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: 'service',
        loadChildren: () => import('./views/service/service.module').then(m => m.ServiceModule)
      },

      {
        path: 'goods',
        loadChildren: () => import('./views/goods/goods.module').then(m => m.GoodsModule)
      }
      ,

      {
        path: 'confirm-donation',
        loadChildren: () => import('./views/confirm-donation/confirm-donation.module').then(m => m.ConfirmDonationModule)
      }
      ,

      {
        path: 'pre-registartion',
        loadChildren: () => import('./views/preregistration/preregistration.module').then(m => m.PreregistrationModule)
      } ,
      
      {
        path: 'chatroom',
        loadChildren: () => import('./views/chatroom/chatroom.module').then(m => m.ChatroomModule)
      }
     
    ]
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule {}
