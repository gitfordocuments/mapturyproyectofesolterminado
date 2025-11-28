import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTaskPageRoutingModule } from './detalle-task-routing.module';

import { DetalleTaskPage } from './detalle-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTaskPageRoutingModule
  ],
  declarations: [DetalleTaskPage]
})
export class DetalleTaskPageModule {}
