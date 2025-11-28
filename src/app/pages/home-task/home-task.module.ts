import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomeTaskPageRoutingModule } from './home-task-routing.module';
import { HomeTaskPage } from './home-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTaskPageRoutingModule
  ],
  declarations: [HomeTaskPage]
})
export class HomeTaskPageModule {}

