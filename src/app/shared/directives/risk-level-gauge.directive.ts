import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRiskLevel]',
  standalone: true
})
export class RiskLevelGaugeDirective implements OnChanges {
  @Input('appRiskLevel') riskLevel: string | null | undefined = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.applyGaugeStyle();
  }

  private applyGaugeStyle(): void {
    const element = this.el.nativeElement;
    this.renderer.addClass(element, 'risk-meter');

    const classesToRemove = ['risk-low', 'risk-moderate', 'risk-high', 'risk-very-high'];
    classesToRemove.forEach(cls => this.renderer.removeClass(element, cls));

    if (!this.riskLevel) return;

    const normalized = this.riskLevel.toUpperCase().replace(/\s+/g, '_');
    switch (normalized) {
      case 'LOW':
        this.renderer.addClass(element, 'risk-low');
        break;
      case 'MODERATE':
        this.renderer.addClass(element, 'risk-moderate');
        break;
      case 'HIGH':
        this.renderer.addClass(element, 'risk-high');
        break;
      case 'VERY_HIGH':
        this.renderer.addClass(element, 'risk-very-high');
        break;
      default:
        break;
    }
  }
}

