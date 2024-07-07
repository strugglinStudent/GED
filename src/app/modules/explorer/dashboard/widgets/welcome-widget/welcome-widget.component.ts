import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
//import { TourService } from 'ngx-ui-tour-ng-bootstrap'

@Component({
  selector: 'app-welcome-widget',
  templateUrl: './welcome-widget.component.html',
  styleUrls: ['./welcome-widget.component.scss'],
  standalone: true,
  imports: [MatButton],
})
export class WelcomeWidgetComponent {
  constructor() {} //  public readonly tourService: TourService

  @Output()
  dismiss: EventEmitter<boolean> = new EventEmitter();
}
