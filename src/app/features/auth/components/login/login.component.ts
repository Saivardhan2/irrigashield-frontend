import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../state/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Quick fill helper for testing/demoing
  fillDemo(email: string, pass: string): void {
    this.loginForm.patchValue({ email, password: pass });
  }
}

