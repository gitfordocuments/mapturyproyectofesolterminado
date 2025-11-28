import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { TasksServiceService } from 'src/app/services/tasks-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-task',
  templateUrl: './home-task.page.html',
  styleUrls: ['./home-task.page.scss'],
})
export class HomeTaskPage implements OnInit, OnDestroy {

  lugares: any[] = [];
  favoritos: string[] = [];
  cargando = true;

  subRealtime!: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private storageService: StorageService,
    private tasksService: TasksServiceService,
    private router: Router
  ) {}
  

  ngOnInit() {
    this.cargarFavoritos();
    this.cargarLugares();

    // 🔥 Escuchar cambios en Supabase y recargar automáticamente
    this.subRealtime = this.supabaseService.destinosActualizados.subscribe((cambio) => {
      if (cambio) {
        console.log('🔄 Cambios detectados, recargando destinos…');
        this.cargarLugares();
      }
    });
  }

  // ⭐⭐⭐ AQUI AGREGO ESTO ⭐⭐⭐
  ionViewWillEnter() {
    console.log('🔁 Volviendo a la página → recargando lugares y favoritos');
    this.cargarFavoritos();
    this.cargarLugares();
  }
  // ⭐⭐⭐ FIN DEL AGREGADO ⭐⭐⭐

  ngOnDestroy() {
    if (this.subRealtime) this.subRealtime.unsubscribe();
  }

  // ================================
  //        CARGAR LUGARES
  // ================================
  async cargarLugares() {
    this.cargando = true;

    const lugaresLocales = this.tasksService.getLugares().map(l => ({
      id: l.id,
      titulo: l.nombre,
      descripcion: l.descripcion,
      imagen_url: l.imagen,
      latitud: l.latitud,       // ← corregido
      longitud: l.longitud,     // ← corregido
      esLocal: true
    }));

    // 2️⃣ Lugares de Supabase
    let lugaresSupabase = [];
    try {
      lugaresSupabase = await this.supabaseService.getDestinos();
    } catch(e) {
      console.error("Error cargando destinos de Supabase:", e);
    }

    // 3️⃣ Unir ambos
    this.lugares = [...lugaresLocales, ...lugaresSupabase];

    this.cargando = false;
  }

  // ================================
  //        FAVORITOS
  // ================================
  async cargarFavoritos() {
    this.favoritos = (await this.storageService.get('favoritos')) || [];
  }

  // Guardar favoritos en storage
  async guardarFavoritos() {
    await this.storageService.set('favoritos', this.favoritos);
  }

  esFavorito(id: string | number) {
    return this.favoritos.includes(String(id));
  }

  async toggleFavorito(lugar: any) {
    const id = String(lugar.id);

    if (this.esFavorito(id)) {
      this.favoritos = this.favoritos.filter(fav => fav !== id);
    } else {
      this.favoritos.push(id);
    }

    await this.guardarFavoritos();
  }

  // ================================
  //          DETALLES
  // ================================
  verDetalles(id: string | number) {
    this.router.navigate(['/detalle-task', id]);
  }

  
}
