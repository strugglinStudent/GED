import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-widget-frame',
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.scss'],
})
export class WidgetFrameComponent {
  constructor() {}

  @Input()
  title: string;

  @Input()
  loading: boolean = false;

  @Input()
  draggable: any;
}
