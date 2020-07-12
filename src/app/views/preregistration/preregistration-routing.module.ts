import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreregistrationComponent } from './preregistration.component';

const routes: Routes = [
  {
    path: '',
    component: PreregistrationComponent,
    data: {
      title: 'Pre-Registration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreregistrationRoutingModule {}