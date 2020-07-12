import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './service/messaging.service';
import { AngularFirestoreModule } from "@angular/fire/firestore";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { DLayoutComponent } from './container';
import { MemberLayoutComponent } from './member';


const APP_CONTAINERS = [
  DefaultLayoutComponent,
  DLayoutComponent,
  MemberLayoutComponent

];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ModalModule } from 'ngx-bootstrap/modal';

import { SigninModule } from './views/signin/signin.module';
import { SignupModule } from './views/signup/signup.module';
import { AgendaModule } from './views/agenda/agenda.module';


import { FullCalendarModule } from '@fullcalendar/angular'; 
import { HomeModule } from './views/home/home.module';
import { EventModule } from './views/event/event.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';





import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  imports: [


    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FullCalendarModule,
    AgendaModule,
    EventModule,
    BrowserModule,
    SignupModule,
    HomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    SigninModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot() ,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
  
  
    
  ],
  
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    
    multi: true
  } , MessagingService,AsyncPipe],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
