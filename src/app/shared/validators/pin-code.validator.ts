import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pinCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    // Indian PIN codes: 6 digits starting with 1-9
    const valid = /^[1-9]\d{5}$/.test(control.value.toString().trim());
    return valid ? null : { invalidPinCode: { value: control.value, message: 'Must be a valid 6-digit Indian PIN code' } };
  };
}

