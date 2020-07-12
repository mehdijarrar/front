import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin.component';

const routes: Routes = [
  {
    path: 'log-in',
    component: SigninComponent,
    data: {
      title: 'Create event'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule {}