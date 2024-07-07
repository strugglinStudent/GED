import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  availableLangs: string[];
  /**
   * Constructor
   */
  constructor(
    private dateAdapter: DateAdapter<any>,
    public platform: Platform,
  ) {}
}
