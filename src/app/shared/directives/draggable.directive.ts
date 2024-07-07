import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private startX = 0;
  private startY = 0;
  private initialLeft = 0;
  private initialTop = 0;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.initialLeft = rect.left;
    this.initialTop = rect.top;
    this.renderer.setStyle(document.body, 'cursor', 'grabbing');

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    this.renderer.setStyle(this.element.nativeElement, 'left', `${this.initialLeft + deltaX}px`);
    this.renderer.setStyle(this.element.nativeElement, 'top', `${this.initialTop + deltaY}px`);
  };

  onMouseUp = () => {
    this.renderer.setStyle(document.body, 'cursor', 'default');
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
