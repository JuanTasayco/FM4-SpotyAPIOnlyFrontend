import { Component, OnInit } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'FM3-SpotyApp';
  ngOnInit(): void {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
}
