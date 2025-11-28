import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LookforTaskPage } from './lookfor-task.page';

const routes: Routes = [
  {
    path: '',
    component: LookforTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookforTaskPageRoutingModule {}
