import { FormGroup, FormControl } from '@angular/forms';
import { dateSequenceValidator } from './date-sequence.validator';

describe('dateSequenceValidator', () => {
  it('should return null when end date is after start date', () => {
    const form = new FormGroup({
      startDate: new FormControl('2026-04-01'),
      endDate: new FormControl('2026-09-30')
    }, { validators: dateSequenceValidator('startDate', 'endDate') });

    expect(form.valid).toBe(true);
    expect(form.errors).toBeNull();
  });

  it('should return error when end date is before start date', () => {
    const form = new FormGroup({
      startDate: new FormControl('2026-10-01'),
      endDate: new FormControl('2026-04-01')
    }, { validators: dateSequenceValidator('startDate', 'endDate') });

    expect(form.hasError('dateSequenceInvalid')).toBe(true);
    expect(form.get('endDate')?.hasError('dateSequenceInvalid')).toBe(true);
  });

  it('should return error when start date and end date are equal', () => {
    const form = new FormGroup({
      startDate: new FormControl('2026-05-01'),
      endDate: new FormControl('2026-05-01')
    }, { validators: dateSequenceValidator('startDate', 'endDate') });

    expect(form.hasError('dateSequenceInvalid')).toBe(true);
  });
});

