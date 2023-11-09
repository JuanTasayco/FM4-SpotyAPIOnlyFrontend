import { Component, Input, OnInit } from '@angular/core';
import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbCarouselModule,
  NgbSlideEvent,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, NgbCarouselModule, TitleCasePipe],
  providers: [NgbCarouselConfig],
  templateUrl: './carrousel.component.html',
  styleUrls: [],
})
export class CarrouselComponent implements OnInit {
  @Input('artistasC') images: any[] = [];

  ngOnInit(): void {}

  onSlide(slideEvent: NgbSlideEvent) {
    console.log(slideEvent);
    /* if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		} */
  }

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
