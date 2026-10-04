import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateSequenceValidator(startDateField: string, endDateField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDateControl = control.get(startDateField);
    const endDateControl = control.get(endDateField);

    if (!startDateControl || !endDateControl) {
      return null;
    }

    const startDateVal = startDateControl.value;
    const endDateVal = endDateControl.value;

    if (!startDateVal || !endDateVal) {
      return null;
    }

    const start = new Date(startDateVal);
    const end = new Date(endDateVal);

    if (end <= start) {
      const error = { dateSequenceInvalid: { message: 'End date must be after start date' } };
      endDateControl.setErrors({ ...endDateControl.errors, ...error });
      return error;
    }

    if (endDateControl.hasError('dateSequenceInvalid')) {
      const currentErrors = { ...endDateControl.errors };
      delete currentErrors['dateSequenceInvalid'];
      endDateControl.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
    }

    return null;
  };
}

