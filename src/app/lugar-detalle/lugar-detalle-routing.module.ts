import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarDetallePage } from './lugar-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: LugarDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarDetallePageRoutingModule {}
