import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipe } from '../safe-url.pipe';
import { LugarDetallePageRoutingModule } from './lugar-detalle-routing.module';
import { LugarDetallePage } from './lugar-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LugarDetallePageRoutingModule
  ],
  declarations: [LugarDetallePage,  SafeUrlPipe]
})
export class LugarDetallePageModule {}
