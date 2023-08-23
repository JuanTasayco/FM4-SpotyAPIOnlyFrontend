import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit {
  artistas: any[] = [];
  SpinnerIsActive: boolean = false;
  posArray: number = 0;
  constructor(private spotiService: SpotifyService) {}
  ngOnInit(): void {
    this.SpinnerIsActive = true;

    this.spotiService.getNewRelease().then((observ) => {
      observ.subscribe((albums: any) => {
        this.SpinnerIsActive = false;
        this.artistas = albums;
      });
      /*  */
    });
  }

  moveLeftMenu() {
    if (this.posArray == 0) this.posArray = 20;
    this.posArray--;
  }

  moveRightMenu() {
    if (this.posArray == 19) this.posArray = -1;
    this.posArray++;
  }
}
