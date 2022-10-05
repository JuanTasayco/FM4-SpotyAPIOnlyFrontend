import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: []
})
export class CardsComponent implements OnInit {
  @Input() contenidos: any[] = [];


  constructor() { }

  ngOnInit(): void {

  }

  obtenerTipo(contenido: any) {
    if (contenido.type === "artist") {
      return contenido.id;
    } else {
      return contenido.artists[0].id;
    }
  }

}
