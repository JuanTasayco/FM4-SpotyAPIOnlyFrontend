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
          this.animationScrollThirdContainer();
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

  @ViewChild('imagenContenedor') imagenArtista!: ElementRef<HTMLElement>;
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
  @ViewChild('textSpotify') textSpotify!: ElementRef<HTMLElement>;
  /*  @HostListener('window:resize', []) */
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
    })
      .to(this.imgSpotify.nativeElement, {
        y: '0',
        scale: 1,
        duration: 1,
      })
      .from(this.textSpotify.nativeElement, {
        opacity: 0,
        ease: 'elastic',
        repeat: 2,
        duration: 2,
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
    setTimeout(() => {
      const phones = gsap.utils.toArray('.phoneS');
      const phonesAnimation = gsap.to(phones, {
        y: '-100',
      });
      /* ideal segun yo 150 mobile, 100 normal para el start */
      ScrollTrigger.create({
        trigger: this.firstContainer.nativeElement,
        start: `start 40%`,
        end: 'bottom 15%',
        animation: phonesAnimation,
        scrub: true,
        markers: true,
      });
    }, 2000);
  }

  /* animation secondContainer (albums) */
  @ViewChild('contenedor2') secondContainer!: ElementRef<HTMLElement>;
  @ViewChild('rowSecondContainer') rowContainer!: ElementRef<HTMLElement>;
  animationScrollSecondContainer() {
    setTimeout(() => {
      const containerAnimation = gsap.to(this.secondContainer.nativeElement, {
        opacity: 1,
        scale: 0.9,
        duration: 0.7,
      });

      ScrollTrigger.create({
        trigger: this.secondContainer.nativeElement,
        start: 'center center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse ',
        animation: containerAnimation,
      });
    }, 200);
  }

  @ViewChild('contenedor3') thirdContainer!: ElementRef<HTMLElement>;
  @ViewChild('contenedor4') fourContainer!: ElementRef<HTMLElement>;

  animationScrollThirdContainer() {
    setTimeout(() => {
      const fourContainerAnimation = gsap.to(this.fourContainer.nativeElement, {
        y: `-${this.fourContainer.nativeElement.offsetHeight}`,
        duration: 4,
        ease: 'none',
      });
      ScrollTrigger.create({
        trigger: this.thirdContainer.nativeElement,
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        pinSpacing: false,
        animation: fourContainerAnimation,
        snap: 1,
      });
    }, 200);
  }

  constructor(
    private spotiService: SpotifyService,
    private cdr: ChangeDetectorRef
  ) {}
}
