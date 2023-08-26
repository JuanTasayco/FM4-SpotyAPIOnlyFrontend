import { Component, OnInit } from '@angular/core';

interface Enlaces {
  nombre: string;
  ubicacion: string;
}

@Component({
  selector: 'app-sgv-icons',
  templateUrl: './sgv-icons.component.html',
})
export class SgvIconsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  rutas: Enlaces[] = [
    {
      nombre: 'Home',
      ubicacion: '/spotify/principal',
    },
    {
      nombre: 'Buscar',
      ubicacion: '/spotify/buscar',
    },
  ];
}
