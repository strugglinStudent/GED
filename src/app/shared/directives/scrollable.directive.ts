import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScrollable]',
  exportAs: 'appScrollable',
})
export class ScrollableDirective {
  constructor(public elementRef: ElementRef) {}

  @Input() scrollUnit: number;

  public get element() {
    return this.elementRef.nativeElement;
  }

  get isOverflow() {
    return this.element.scrollWidth > this.element.clientWidth;
  }

  scroll(direction: number) {
    this.element.scrollLeft += this.scrollUnit * direction;
  }

  get canScrollStart() {
    return this.element.scrollLeft > 0;
  }

  get canScrollEnd() {
    return this.element.scrollLeft + this.element.clientWidth != this.element.scrollWidth;
  }
}
