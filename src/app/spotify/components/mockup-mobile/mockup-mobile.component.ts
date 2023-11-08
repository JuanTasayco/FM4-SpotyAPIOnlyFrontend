import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mockup-mobile',
  standalone: true,
  imports: [],
  templateUrl: './mockup-mobile.component.html',
  styleUrls: ['./mockup-mobile.component.scss'],
})
export class MockupMobileComponent {
  @Input() imageMockup: string = '';
}
