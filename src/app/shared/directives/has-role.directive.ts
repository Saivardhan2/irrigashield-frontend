import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUserRole } from '../../features/auth/state/auth.selectors';
import { Role } from '../../features/auth/model/auth.models';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private store = inject(Store);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private allowedRoles: Role[] = [];
  private sub?: Subscription;
  private isVisible = false;

  @Input('appHasRole')
  set appHasRole(roles: Role[] | Role) {
    this.allowedRoles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  private currentRole: Role | null = null;

  ngOnInit(): void {
    this.sub = this.store.select(selectUserRole).subscribe(role => {
      this.currentRole = role;
      this.updateView();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateView(): void {
    const hasPermission = this.currentRole !== null && this.allowedRoles.includes(this.currentRole);

    if (hasPermission && !this.isVisible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else if (!hasPermission && this.isVisible) {
      this.viewContainer.clear();
      this.isVisible = false;
    }
  }
}

