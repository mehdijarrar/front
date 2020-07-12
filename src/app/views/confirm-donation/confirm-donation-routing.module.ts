import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmDonationComponent } from './confirm-donation.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmDonationComponent,
    data: {
      title: 'Service'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmDonationRoutingModule {}