import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appClickDirective]'
})
export class ClickDirectiveDirective {
  constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick() {
    this.router.navigate(['Homepage/inicio']);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }
}

  