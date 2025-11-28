import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TasksServiceService } from 'src/app/services/tasks-service.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-favorites-task',
  templateUrl: './favorites-task.page.html',
  styleUrls: ['./favorites-task.page.scss'],
})
export class FavoritesTaskPage implements OnInit {

  favoritosIds: string[] = [];
  favoritos: any[] = [];

  constructor(
    private storageService: StorageService,
    private tasksService: TasksServiceService,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargarFavoritos();
  }

  async ionViewWillEnter() {
    await this.cargarFavoritos();
  }

  async cargarFavoritos() {
    this.favoritosIds = (await this.storageService.get('favoritos')) || [];

    const locales = this.tasksService.getLugares().map(l => ({
      id: l.id,
      titulo: l.nombre,
      descripcion: l.descripcion,
      imagen_url: l.imagen,
      latitud: l.latitud,
      longitud: l.longitud,
      esLocal: true
    }));

    const remotos = await this.supabaseService.getDestinos();

    const todos = [...locales, ...remotos];

    this.favoritos = todos.filter(l => this.favoritosIds.includes(String(l.id)));
  }

  verDetalles(id: string) {
    this.router.navigate(['/detalle-task', id]);
  }
}
