import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
     

      {
        path: 'homeTask',
        loadChildren: () => import('../home-task/home-task.module').then(m => m.HomeTaskPageModule)
      },
      {
        path: 'favoritesTask',
        loadChildren: () => import('../favorites-task/favorites-task.module').then(m => m.FavoritesTaskPageModule)
      },
      {
        path: 'perfilTask',
        loadChildren: () => import('../perfil-task/perfil-task.module').then(m => m.PerfilTaskPageModule)
      },
      {
        path: 'lookfor-task',
        loadChildren: () => import('../lookfor-task/lookfor-task.module').then(m => m.LookforTaskPageModule)
      },
      {
        path: 'sugerenciasTask',
        loadChildren: () => import('../sugerencias-task/sugerencias-task.module').then(m => m.SugerenciasTaskPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/homeTask',
        pathMatch: 'full'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

