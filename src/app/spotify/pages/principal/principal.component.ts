import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit, AfterViewInit {
  artistas: any[] = [];
  SpinnerIsActive: boolean = false;
  posArray: number = 0;
  /* controlo la activacion de botones a cuando termina de pasar una imagen, porque si el usuario da clicks muy rapido la animación de gsap se interrumpe */
  desactivarControles: boolean = false;

  @ViewChild('imagenContenedor') imagenArtista!: ElementRef<HTMLElement>;
  @ViewChildren('containerScroll') containersScroll!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    /* logica para scrollanimations de contenedores */
  }

  ngOnInit(): void {
    this.SpinnerIsActive = true;
    this.spotiService.getNewRelease().then((observ) => {
      observ.subscribe((albums: any) => {
        this.SpinnerIsActive = false;
        this.artistas = albums;
        this.animationsScrollingContainers();
      });
    });
    gsap.registerPlugin(ScrollTrigger);
  }

  moveLeftMenu() {
    if (this.posArray == 0) this.posArray = 20;
    this.posArray--;
    this.desactivarControles = true;
    this.animationFromBannerImages();
  }

  moveRightMenu() {
    if (this.posArray == 19) this.posArray = -1;
    this.posArray++;
    this.desactivarControles = true;
    this.animationFromBannerImages();
  }

  animationFromBannerImages() {
    gsap.from(this.imagenArtista.nativeElement, {
      scale: 0.5,
      onComplete: () => {
        this.desactivarControles = false;
      },
    });
  }

  @ViewChild('contenedorPrincipal')
  contenedorPrincipal!: ElementRef<HTMLDivElement>;
  animationsScrollingContainers() {
    if (this.artistas.length > 0) {
      this.cdr.detectChanges();
    }
  }

  constructor(
    private spotiService: SpotifyService,
    private cdr: ChangeDetectorRef
  ) {}
}
