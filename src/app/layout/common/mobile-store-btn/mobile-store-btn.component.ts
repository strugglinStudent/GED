import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mobile-store-btn',
  templateUrl: './mobile-store-btn.component.html',
  styleUrls: ['./mobile-store-btn.component.scss'],
})
export class MobileStoreStnComponent {
  environment = environment;

  /**
   * Constructor
   */
  constructor() {}
}
