import { FormControl } from '@angular/forms';
import { indianPhoneValidator } from './phone.validator';

describe('indianPhoneValidator', () => {
  const validator = indianPhoneValidator();

  it('should return null for valid 10-digit mobile number', () => {
    const control = new FormControl('9876543210');
    expect(validator(control)).toBeNull();
  });

  it('should return null if value is empty (optional handled by Validators.required)', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should return error for number starting with 1-5', () => {
    const control = new FormControl('1234567890');
    expect(validator(control)).toEqual({
      invalidPhone: { value: '1234567890', message: 'Must be a valid 10-digit Indian mobile number' }
    });
  });

  it('should return error for invalid length', () => {
    const control = new FormControl('987654321');
    expect(validator(control)).toBeTruthy();
  });
});

