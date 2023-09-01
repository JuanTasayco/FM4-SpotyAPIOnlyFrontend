import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: [],
})
export class CardsComponent implements OnInit, AfterViewInit {
  @Input() contenidos: any[] = [];

  @ViewChildren('cardArtist') cards!: QueryList<ElementRef<HTMLElement>>;
  constructor() {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cards.forEach(({ nativeElement: element }, index, arreglo) => {
        if (index % 2 == 0) {
          /* pares porque residuo es 0 */
          gsap.from(element, {
            y: '50%',
            duration: 2,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          });
        } else {
          gsap.from(element, {
            y: '50%',
            duration: 2,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: `+=${element.offsetHeight}`,
              scrub: 1,
            },
          });
        }
      });
    }, 200);
  }

  ngOnInit(): void {}

  obtenerTipo(contenido: any) {
    if (contenido.type === 'artist') {
      return contenido.id;
    } else {
      return contenido.artists[0].id;
    }
  }
}
