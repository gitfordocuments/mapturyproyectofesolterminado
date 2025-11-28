import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksServiceService } from 'src/app/services/tasks-service.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-detalle-task',
  templateUrl: './detalle-task.page.html',
  styleUrls: ['./detalle-task.page.scss'],
})
export class DetalleTaskPage implements OnInit {

  task: any = null;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksServiceService,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) return;

    // Primero buscar en lugares locales
    const lugarLocal = this.tasksService.getLugarById(id);

    if (lugarLocal) {
      this.task = {
        id: lugarLocal.id,
        nombre: lugarLocal.nombre,
        descripcion: lugarLocal.descripcion,
        imagen: lugarLocal.imagen,
        latitud: lugarLocal.latitud,
        longitud: lugarLocal.longitud
      };
      return;
    }

    // Si no existe local → buscar en Supabase
    this.cargarDestinoSupabase(id);
  }

  async cargarDestinoSupabase(id: string) {
    const data = await this.supabaseService.getDestinoById(id);

    if (!data) return;

    this.task = {
      id: data.id,
      nombre: data.titulo,
      descripcion: data.descripcion,
      imagen: data.imagen_url,
      latitud: data.latitud,
      longitud: data.longitud
    };
  }

  abrirMapa(nombre: string, latitud: number, longitud: number) {
    const url = `https://www.google.com/maps?q=${latitud},${longitud}`;
    window.open(url, '_blank');
  }

  async compartirLugar() {
    if (!this.task) return;

    const mensaje = `
📍 *${this.task.nombre}*
${this.task.descripcion}

🌎 Ubicación:
Lat: ${this.task.latitud}
Lng: ${this.task.longitud}

🖼 Imagen:
${this.task.imagen}
`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: this.task.nombre,
          text: mensaje,
          url: this.task.imagen
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      alert("Este dispositivo no admite compartir.");
    }
  }
}
