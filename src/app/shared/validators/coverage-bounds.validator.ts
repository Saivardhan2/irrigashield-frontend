import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function coverageBoundsValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }

    const numericValue = Number(control.value);

    if (isNaN(numericValue)) {
      return { invalidNumber: { message: 'Coverage amount must be a number' } };
    }

    if (numericValue < min) {
      return { minCoverageBreached: { min, actual: numericValue, message: `Minimum coverage required is ₹${min}` } };
    }

    if (numericValue > max) {
      return { maxCoverageBreached: { max, actual: numericValue, message: `Maximum coverage allowed is ₹${max}` } };
    }

    return null;
  };
}

