import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.checkLogin();
  }

  checkLogin() {
    const loggedIn = localStorage.getItem('isLoggedIn');

    if (!loggedIn) {
      // Si no está logueado, lo lleva al login
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}

