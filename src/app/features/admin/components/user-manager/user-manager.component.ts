import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../state/admin.actions';
import { selectAdminUsers, selectAdminLoading } from '../../state/admin.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';
import { CreateUserRequest } from '../../model/admin.models';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusBadgeDirective],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  userForm!: FormGroup;
  users$ = this.store.select(selectAdminUsers);
  loading$ = this.store.select(selectAdminLoading);
  showForm = false;

  roles = ['UNDERWRITER', 'DATA_PROVIDER', 'CLAIMS_OFFICER', 'ADMIN', 'FARMER'];

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadUsers());

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['UNDERWRITER', Validators.required]
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const req: CreateUserRequest = this.userForm.value;
    this.store.dispatch(AdminActions.createUser({ request: req }));
    this.userForm.reset({ role: 'UNDERWRITER' });
    this.showForm = false;
  }
}