import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTaskPage } from './home-task.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTaskPageRoutingModule {}

