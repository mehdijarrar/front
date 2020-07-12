import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsComponent } from './goods.component';

const routes: Routes = [
  {
    path: '',
    component: GoodsComponent,
    data: {
      title: 'Goods'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule {}