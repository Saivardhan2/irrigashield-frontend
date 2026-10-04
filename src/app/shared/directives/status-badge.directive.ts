import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]',
  standalone: true
})
export class StatusBadgeDirective implements OnChanges {
  @Input('appStatusBadge') status: string | null | undefined = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.applyBadgeStyle();
  }

  private applyBadgeStyle(): void {
    const element = this.el.nativeElement;

    // Reset base classes
    this.renderer.addClass(element, 'badge');

    // Remove any previous badge variant classes
    const classesToRemove = [
      'badge-success', 'badge-warning', 'badge-danger', 'badge-info', 'badge-neutral',
      'badge-active', 'badge-settled', 'badge-paid', 'badge-approved', 'badge-verified',
      'badge-under-review', 'badge-submitted', 'badge-pending',
      'badge-rejected', 'badge-failed', 'badge-expired', 'badge-cancelled',
      'badge-assessed', 'badge-draft', 'badge-no-claim', 'badge-not-required'
    ];
    classesToRemove.forEach(cls => this.renderer.removeClass(element, cls));

    if (!this.status) {
      this.renderer.addClass(element, 'badge-neutral');
      return;
    }

    const normalized = this.status.toUpperCase().replace(/\s+/g, '_');

    switch (normalized) {
      case 'ACTIVE':
      case 'SETTLED':
      case 'PAID':
      case 'APPROVED':
      case 'VERIFIED':
      case 'SUCCESS':
        this.renderer.addClass(element, 'badge-success');
        break;

      case 'SUBMITTED':
      case 'UNDER_REVIEW':
      case 'PENDING':
        this.renderer.addClass(element, 'badge-warning');
        break;

      case 'REJECTED':
      case 'FAILED':
      case 'EXPIRED':
      case 'CANCELLED':
        this.renderer.addClass(element, 'badge-danger');
        break;

      case 'ASSESSED':
      case 'DRAFT':
        this.renderer.addClass(element, 'badge-info');
        break;

      case 'NO_CLAIM':
      case 'NOT_REQUIRED':
      default:
        this.renderer.addClass(element, 'badge-neutral');
        break;
    }
  }
}

