import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { gsap } from 'gsap';

import { Router } from '@angular/router';
import { Artists } from '../../interfaces/spotify.interface';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit, AfterViewInit {
  @ViewChild('containerMockupMobiles')
  containerMockupMobile!: ElementRef<HTMLElement>;
  @ViewChildren('phoneMockup') phonesMockup!: QueryList<ElementRef>;

  @ViewChild('logoSpotify') logoSpotify!: ElementRef<HTMLElement>;
  @ViewChild('textSpotify') textSpotify!: ElementRef<HTMLElement>;

  @ViewChild('carrouselContainer') containerCarrousel!: ElementRef<HTMLElement>;
  artistas!: Artists[];
  spinnerIsActive: boolean = false;

  ngAfterViewInit(): void {
    this.removeHandlerWheel();
  }

  ngOnInit(): void {
    this.spinnerIsActive = true;
    this.spotiService.getNewRelease().then((observ) => {
      observ.subscribe((albums: Artists[]) => {
        this.spinnerIsActive = false;
        this.artistas = albums;

        this.cdr.detectChanges();
        this.animationSpotifyLogo();
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
        gsap.from(element, {
          delay: 0.7,
          y: `${altoMenu}px`,
          duration: 1.8,
        });

        this.phonesMockup.forEach(({ nativeElement: phone }, index) => {
          if (index == 0) {
            gsap.from(phone, {
              delay: 1.5,
              rotateX: '20',
              translateX: '-40%',
              duration: 1.5,
            });
          } else if (index == 2) {
            gsap.from(phone, {
              delay: 1.5,
              rotateX: '20',
              translateX: '40%',
              duration: 1.5,
              onComplete: () => {
                this.addHandlerWheel();
                this.animationScrollPhonesMockup();
                this.animationHorizontal();
                this.animationCarrouselSection();
              },
            });
          }
        });
      }
    });
  }

  animationScrollPhonesMockup() {
    this.phonesMockup.forEach((item, index) => {
      if (index !== 1) {
        gsap.to(item.nativeElement, {
          y: '-100',
          scrollTrigger: {
            trigger: this.containerMockupMobile.nativeElement,
            start: `start 30%`,
            end: 'center 30%',
            scrub: true,
          },
        });
      }
    });
  }

  animationCarrouselSection() {
    const el = this.containerCarrousel.nativeElement;
    gsap.from(el, {
      scale: 0.7,
      scrollTrigger: {
        scrub: true,
        trigger: el,
        start: 'top 90%',
        end: 'center center',
      },
    });
  }

  @ViewChild('containerHorizontal')
  containerHorizontal!: ElementRef<HTMLElement>;
  @ViewChildren('childHorizontal')
  childsHorizontal!: QueryList<ElementRef>;
  animationHorizontal() {
    const sections = gsap.utils.toArray('.Menu-row');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: this.containerHorizontal.nativeElement,
        scrub: true,
        pin: true,
        start: 'top 15%',

        end: '+=' + this.containerHorizontal.nativeElement.offsetWidth,
      },
    });
  }

  removeHandlerWheel() {
    const htmlElement: HTMLElement =
      this.el.nativeElement.ownerDocument.documentElement;
    this.render.setStyle(htmlElement, 'overflow-y', 'hidden');
    document.body.classList.add('scrollRemove');
  }

  addHandlerWheel() {
    const htmlElement: HTMLElement =
      this.el.nativeElement.ownerDocument.documentElement;
    this.render.removeStyle(htmlElement, 'overflow-y');
    document.body.classList.remove('scrollRemove');
  }

  constructor(
    private spotiService: SpotifyService,
    private router: Router,
    private render: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}
}
