import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function indianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
    const valid = /^[6-9]\d{9}$/.test(control.value.toString().trim());
    return valid ? null : { invalidPhone: { value: control.value, message: 'Must be a valid 10-digit Indian mobile number' } };
  };
}

