import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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

  ngAfterViewInit(): void {
    /* logica para scrollanimations de contenedores */
  }

  ngOnInit(): void {
    this.SpinnerIsActive = true;
    this.spotiService.getNewRelease().then((observ) => {
      observ.subscribe((albums: any) => {
        this.SpinnerIsActive = false;
        this.artistas = albums;
        if (this.artistas.length > 0) {
          this.cdr.detectChanges();
          this.firstAnimationForPresentPage();
          this.animationScrollFirsContainer();
          this.animationScrollSecondContainer();
        }
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

  @ViewChild('imgPrincipal') imgSpotify!: ElementRef<HTMLElement>;
  @ViewChildren('contenidoPrincipal') contenidoP!: QueryList<ElementRef>;
  @HostListener('window:resize', [])
  firstAnimationForPresentPage() {
    const tl = gsap.timeline({});

    gsap.set(this.imgSpotify.nativeElement, {
      y: '400%',
      scale: window.innerWidth < 576 ? 2 : 4,
      opacity: 0,
    });

    tl.to(this.imgSpotify.nativeElement, {
      duration: 0.8,
      opacity: 1,
    }).to(this.imgSpotify.nativeElement, {
      y: '0',
      scale: 1,
      duration: 1,
    });

    this.contenidoP.forEach(({ nativeElement: elemento }: ElementRef) => {
      gsap.from(elemento, {
        delay: 1.2,
        opacity: 0,
        y: '200%',
        duration: 1,
      });
    });
  }

  /* animation firstContainer (front)*/
  @ViewChild('contenedor1') firstContainer!: ElementRef<HTMLElement>;
  animationScrollFirsContainer() {
    const phones = gsap.utils.toArray('.phoneS');
    const phonesAnimation = gsap.to(phones, {
      y: '-100',
    });
    /* ideal segun yo 150 mobile, 100 normal para el start */
    ScrollTrigger.create({
      trigger: this.firstContainer.nativeElement,
      start: `-150% 40%`,
      end: 'bottom 15%',
      animation: phonesAnimation,
      scrub: true,
    });
  }

  /* animation secondContainer (albums) */
  @ViewChild('contenedor2') secondContainer!: ElementRef<HTMLElement>;
  animationScrollSecondContainer() {
    ScrollTrigger.create({
      
    })
  }

  constructor(
    private spotiService: SpotifyService,
    private cdr: ChangeDetectorRef
  ) {}
}
