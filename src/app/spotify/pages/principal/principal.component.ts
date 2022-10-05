import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: []
})
export class PrincipalComponent implements OnInit {

  nuevasPeliculas: any[] = [];
  SpinnerIsActive : boolean = false;

  constructor(private spotiService: SpotifyService) { }
  ngOnInit(): void {

    this.SpinnerIsActive= true;

    this.spotiService.getNewRelease()
      .then((observ)=>{
        observ.subscribe((albums: any )=>{
          this.SpinnerIsActive= false;
          this.nuevasPeliculas = albums;
        })
        /*  */
      })
  }
  /*    */
}
