import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lugar-detalle',
  templateUrl: './lugar-detalle.page.html',
  styleUrls: ['./lugar-detalle.page.scss'],
})
export class LugarDetallePage implements OnInit {

  lugar: any;
  mapaUrl!: SafeResourceUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    const nav = this.router.getCurrentNavigation();
    this.lugar = nav?.extras.state?.['lugar'];
  }

  ngOnInit() {
    const q = encodeURIComponent(this.lugar.mapa);
    const embed = `https://www.google.com/maps?q=${q}&output=embed`;
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

}
