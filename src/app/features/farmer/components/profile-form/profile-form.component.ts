import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectFarmerProfile, selectFarmerLoading } from '../../state/farmer.selectors';
import { indianPhoneValidator } from '../../../../shared/validators/phone.validator';
import { pinCodeValidator } from '../../../../shared/validators/pin-code.validator';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusBadgeDirective],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  profile$ = this.store.select(selectFarmerProfile);
  loading$ = this.store.select(selectFarmerLoading);

  profileForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    phoneNumber: ['', [Validators.required, indianPhoneValidator()]],
    addressLine: ['', [Validators.required]],
    village: ['', [Validators.required]],
    district: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required, pinCodeValidator()]],
    bankAccountLastFour: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
  });

  ngOnInit(): void {
    this.store.dispatch(FarmerActions.loadProfile());
    this.profile$.subscribe(prof => {
      if (prof) {
        this.profileForm.patchValue({
          fullName: prof.fullName,
          phoneNumber: prof.phoneNumber,
          addressLine: prof.addressLine,
          village: prof.village,
          district: prof.district,
          state: prof.state,
          postalCode: prof.postalCode,
          bankAccountLastFour: prof.bankAccountLastFour
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.store.dispatch(FarmerActions.saveProfile({ profile: this.profileForm.value }));
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}