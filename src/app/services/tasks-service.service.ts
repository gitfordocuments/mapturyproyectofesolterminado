import { Injectable } from '@angular/core';


export interface Lugar {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  latitud: number;
  longitud: number;
}

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  private lugaresLocales: Lugar[] = [
    {
      id: '1',
      nombre: 'Playa El Tunco',
      descripcion: 'Una playa icónica para surfistas.',
      imagen: 'assets/icon/imagen5{{.jpg',
      latitud: 13.4887,
      longitud: -89.3818
    },
    {
      id: '2',
      nombre: 'Parque Turistico BALBOA',  // 🔥 nombre → titulo
      descripcion: 'Turismo, gastronomía y naturaleza.',
      imagen: 'assets/icon/img2.jpg',  // 🔥 imagen → imagen_url
      latitud: 13.640388,
      longitud: -89.1925156
    }
  ];

  constructor() {}

  // ------------------------------
  // LUGARES NORMALES
  // ------------------------------
  getLugares() {
    return this.lugaresLocales;
  }

  getLugarById(id: string): Lugar | undefined {
    return [...this.lugaresLocales, ...this.getFavoritos()].find(l => l.id === id);
  }

  // ------------------------------
  // FAVORITOS — 100% FUNCIONANDO
  // ------------------------------

  getFavoritos(): Lugar[] {
    return JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  esFavorito(id: string): boolean {
    const favoritos = this.getFavoritos();
    return favoritos.some(f => f.id === id);
  }

  toggleFavorito(lugar: Lugar) {
    const favoritos = this.getFavoritos();
    const existe = favoritos.find(f => f.id === lugar.id);

    let nuevosFavoritos: Lugar[];

    if (existe) {
      // remover
      nuevosFavoritos = favoritos.filter(f => f.id !== lugar.id);
    } else {
      // agregar
      nuevosFavoritos = [...favoritos, lugar];
    }

    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  }

}
