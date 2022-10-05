import { Component, OnInit } from '@angular/core';

interface Enlaces {
  nombre: string,
  ubicacion: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  rutas: Enlaces[] = [
    {
      nombre: "Home",
      ubicacion: "/spotify/principal"
    },
    {
      nombre: "Buscar",
      ubicacion: "/spotify/buscar"
    }
  ];

  constructor() { }
  ngOnInit(): void {
  }



}
