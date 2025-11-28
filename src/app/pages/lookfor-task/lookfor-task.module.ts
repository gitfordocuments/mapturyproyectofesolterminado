import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LookforTaskPageRoutingModule } from './lookfor-task-routing.module';

import { LookforTaskPage } from './lookfor-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LookforTaskPageRoutingModule
  ],
  declarations: [LookforTaskPage]
})
export class LookforTaskPageModule {}
