import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: []
})
export class ArtistaComponent implements OnInit {

  artista: any;
  tracks: any;
  SpinnerIsActive: boolean = false;

  ngOnInit(): void {
    this.SpinnerIsActive = true;
    this.route.params.pipe(switchMap(({ id }) => this.spotiService.getArtistByID(id)))
      .subscribe(obsv => {  //debido al promises para el token, solo resolver una vez más el subscribe
        obsv.subscribe((contenido) => {
          this.artista = contenido;
          this.SpinnerIsActive = false;
        })

      })

    this.route.params.pipe(switchMap(({ id }) => this.spotiService.getTopTracks(id)))
      .subscribe(obsv => {
        obsv.subscribe((contenido) => {
          this.tracks = contenido;
          this.SpinnerIsActive = false;
        })

      })

  }
  constructor(private spotiService: SpotifyService,
    private route: ActivatedRoute) { }



}
