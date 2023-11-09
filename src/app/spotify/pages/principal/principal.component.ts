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
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit, AfterViewInit {
  @ViewChild('containerMockupMobiles')
  containerMockupMobile!: ElementRef<HTMLElement>;
  @ViewChildren('phoneMockup') phonesMockup!: QueryList<ElementRef>;

  artistas: any[] = [];
  SpinnerIsActive: boolean = false;

  ngAfterViewInit(): void {
    /* logica para scrollanimations de contenedores */
    this.animationScrollPhonesMockup();
  }

  ngOnInit(): void {
    this.SpinnerIsActive = true;
    this.spotiService.getNewRelease().then((observ) => {
      observ.subscribe((albums: any) => {
        this.SpinnerIsActive = false;
        this.artistas = albums;
        if (this.artistas.length > 0) {
          /*          this.cdr.detectChanges();
          this.firstAnimationForPresentPage();
          */
        }
      });
    });
  }

  redirectToArtist(contenido: any) {
    if (contenido.type === 'artist') {
      this.router.navigate([`/spotify/artista/${contenido.id}`]);
    } else {
      this.router.navigate([`/spotify/artista/${contenido.artists[0].id}`]);
    }
  }

  redirectToSearchArtist() {
    this.router.navigate(['/spotify/buscar']);
  }

  @ViewChild('logoSpotify') logoSpotify!: ElementRef<HTMLElement>;
  @ViewChild('textSpotify') textSpotify!: ElementRef<HTMLElement>;
  /*  @HostListener('window:resize', []) */
  animationSpotifyLogo() {
    const tl = gsap.timeline({});
    gsap.set(this.logoSpotify.nativeElement, {
      y: '400%',
      scale: window.innerWidth < 576 ? 2 : 4,
      opacity: 0,
    });

    tl.to(this.logoSpotify.nativeElement, {
      duration: 1.2,
      opacity: 1,
    })
      .to(this.logoSpotify.nativeElement, {
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
        const phones: Array<HTMLElement> = gsap.utils.toArray('.mobileMockup');
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

  animationScrollPhonesMockup() {
    console.log(this.containerMockupMobile.nativeElement);
    this.phonesMockup.forEach((item, index) => {
      if (index !== 1) {
        gsap.to(item.nativeElement, {
          y: '-100',
          scrollTrigger: {
            trigger: this.containerMockupMobile.nativeElement,
            start: `start center`,
            end: 'center center',
            scrub: true,
            markers: true,
          },
        });
      }
    });

    /* ideal segun yo 150 mobile, 100 normal para el start */
  }

  constructor(
    private spotiService: SpotifyService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}
}
