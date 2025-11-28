import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasTaskPage } from './sugerencias-task.page';

const routes: Routes = [
  {
    path: '',
    component: SugerenciasTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerenciasTaskPageRoutingModule {}
