import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public appPages = [
    { title: 'home', url: 'homeTask', icon: 'home-outline' },
    { title: 'Agregar', url: 'sugerenciasTask', icon: 'add' },
    { title: 'favorites', url: 'favoritesTask', icon: 'heart-outline' },
    { title: 'Look for', url: 'lookfor-task', icon: 'search' },
    { title: 'perfil', url: 'perfilTask', icon: 'person-outline' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
