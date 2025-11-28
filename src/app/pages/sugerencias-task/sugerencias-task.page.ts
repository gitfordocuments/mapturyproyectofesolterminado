import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sugerencias-task',
  templateUrl: './sugerencias-task.page.html',
  styleUrls: ['./sugerencias-task.page.scss'],
})
export class SugerenciasTaskPage {

  titulo: string = '';
  descripcion: string = '';
  imagen!: File | null;
  latitud!: number;
  longitud!: number;

  constructor(
    private supabaseService: SupabaseService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  // Seleccionar imagen desde input <input>
  seleccionarImagen(e: any) {
    this.imagen = e.target.files[0];
  }

  // Obtener coordenadas GPS
  async obtenerUbicacion() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      this.latitud = pos.coords.latitude;
      this.longitud = pos.coords.longitude;
    } catch (err) {
      console.log('Error al obtener ubicación:', err);
    }
  }

  // Guardar todo
  async guardarDestino() {
    if (!this.titulo || !this.descripcion || !this.imagen) {
      this.mostrarAlerta('Campos incompletos', 'Completa todos los campos e incluye una imagen.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Guardando destino...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      // 1. Obtener ubicación
      await this.obtenerUbicacion();

      // 2. Subir imagen
      const fileName = `${Date.now()}_${this.imagen!.name}`;
      const imagenUrl = await this.supabaseService.subirImagenDestino(this.imagen!, fileName);

      // 3. Guardar destino en Supabase
      await this.supabaseService.agregarDestino({
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen_url: imagenUrl,
        latitud: this.latitud,
        longitud: this.longitud,
        created_at: new Date()
      });

      // 4. Resetear formulario
      this.titulo = '';
      this.descripcion = '';
      this.imagen = null;

      this.mostrarAlerta('Éxito', 'Destino agregado correctamente 🎉');

    } catch (err) {
      console.error(err);
      this.mostrarAlerta('Error', 'Hubo un problema al guardar el destino.');
    } finally {
      loading.dismiss();
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
