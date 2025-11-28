import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilTaskPageRoutingModule } from './perfil-task-routing.module';

import { PerfilTaskPage } from './perfil-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilTaskPageRoutingModule
  ],
  declarations: [PerfilTaskPage]
})
export class PerfilTaskPageModule {}
