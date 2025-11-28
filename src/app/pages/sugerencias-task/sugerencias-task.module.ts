import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugerenciasTaskPageRoutingModule } from './sugerencias-task-routing.module';

import { SugerenciasTaskPage } from './sugerencias-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugerenciasTaskPageRoutingModule
  ],
  declarations: [SugerenciasTaskPage]
})
export class SugerenciasTaskPageModule {}
