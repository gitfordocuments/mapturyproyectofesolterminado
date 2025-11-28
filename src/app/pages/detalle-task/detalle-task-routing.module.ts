import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTaskPage } from './detalle-task.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTaskPageRoutingModule {}
