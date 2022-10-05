import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: []
})
export class BuscarComponent implements OnInit {

  @ViewChild("valoresInput") valorInput!: ElementRef;
  debounce = new Subject<string>();
  resultados: any[] = [];
  SpinnerIsActive: boolean = false;


  ngOnInit(): void {
    this.resultados = JSON.parse(localStorage.getItem("keySearch")!) || [];

    this.debounce
      .pipe(switchMap(resp => this.spotiService.searchArtist(resp)))
      .subscribe((obsv: any) => {
        obsv.subscribe((artistas: any) => {
          this.resultados = artistas;
          localStorage.setItem("keySearch", JSON.stringify(this.resultados))
          this.SpinnerIsActive = false;
        })

      })
      
  }

  obtenerBusqueda(busqueda: any) {
    const valor = busqueda.target.value;
    if (valor.length > 0) { this.SpinnerIsActive = true; this.debounce.next(valor); }

  }

  presionarEnter() {
    this.valorInput.nativeElement.value = "";
  }

  constructor(private spotiService: SpotifyService) { }



}
