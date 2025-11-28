import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilTaskPage } from './perfil-task.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilTaskPageRoutingModule {}
