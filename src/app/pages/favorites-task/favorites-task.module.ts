import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesTaskPageRoutingModule } from './favorites-task-routing.module';
import { FavoritesTaskPage } from './favorites-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesTaskPageRoutingModule
  ],
  declarations: [FavoritesTaskPage]
})
export class FavoritesTaskPageModule {}
