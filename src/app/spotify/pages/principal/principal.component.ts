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
      duration: 1.2,
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

    const contenido: Array<HTMLElement> = gsap.utils.toArray('.contenido');
    const altoMenu = document.querySelector('.Menu-principal')?.clientWidth;
    contenido.forEach((element, index) => {
      if (index == 0) {
        /* controlar el primer elemento con el button */
        gsap.from(element, {
          delay: 0.9,
          y: `${altoMenu}px`,
          duration: 1.4,
        });
      } else {
        /* controlar los telefonos de la portada */
        const phones: Array<HTMLElement> = gsap.utils.toArray('.phoneS');
        gsap.from(element, {
          delay: 0.7,
          y: `${altoMenu}px`,
          duration: 1.8,
        });

        /* controlar animación de los telefonos  */
        gsap.from(phones[0], {
          delay: 1.5,
          rotateX: '20',
          translateX: '-40%',
          duration: 1.5,
        });
        gsap.from(phones[1], {
          delay: 1.5,
          rotateX: '20',
          translateX: '40%',
          duration: 1.5,
        });
      }
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
      });
    }, 2000);
  }

  /* animation secondContainer (albums) */
  @ViewChild('contenedor2') secondContainer!: ElementRef<HTMLElement>;
  @ViewChild('rowSecondContainer') rowContainer!: ElementRef<HTMLElement>;
  animationScrollSecondContainer() {
    setTimeout(() => {
      /*  const containerAnimation = gsap.from(this.secondContainer.nativeElement, {
        opacity: 1,
        scale: 0.9,
        duration: 0.7,
      });

      */
      /*    ScrollTrigger.create({
        trigger: this.secondContainer.nativeElement,
        start: 'top top',
        end: 'bottom top',
        toggleActions: 'play reverse play reverse ',
        snap: 1,
      }); */
    }, 200);
  }

  @ViewChild('contenedor3') thirdContainer!: ElementRef<HTMLElement>;
  @ViewChild('contenedor4') fourContainer!: ElementRef<HTMLElement>;
  @ViewChildren('menu3') containers3!: QueryList<ElementRef<HTMLElement>>;
  animationScrollThirdContainer() {
    setTimeout(() => {
      this.containers3.forEach((elemento, index) => {
        if (index == 0) {
          gsap.from(elemento.nativeElement, {
            opacity: 0,
            scrollTrigger: {
              scrub: 1,
              trigger: this.thirdContainer.nativeElement,
              start: 'top 70%',
              end: 'bottom center',
            },
          });
        } else {
          gsap.from(elemento.nativeElement, {
            opacity: 0,
            y: '50%',
            scrollTrigger: {
              scrub: 1,
              trigger: this.thirdContainer.nativeElement,
              start: 'top 70%',
              end: 'bottom center',
            },
          });
        }
      });
    }, 200);
  }

  constructor(
    private spotiService: SpotifyService,
    private cdr: ChangeDetectorRef
  ) {}
}
