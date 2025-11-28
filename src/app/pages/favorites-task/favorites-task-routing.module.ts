import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesTaskPage } from './favorites-task.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesTaskPageRoutingModule {}
