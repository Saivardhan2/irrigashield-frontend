import { FormControl } from '@angular/forms';
import { pinCodeValidator } from './pin-code.validator';

describe('pinCodeValidator', () => {
  const validator = pinCodeValidator();

  it('should return null for valid 6-digit PIN code', () => {
    const control = new FormControl('411001');
    expect(validator(control)).toBeNull();
  });

  it('should return null for empty value', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should return error for PIN code starting with 0', () => {
    const control = new FormControl('012345');
    expect(validator(control)).toEqual({
      invalidPinCode: { value: '012345', message: 'Must be a valid 6-digit Indian PIN code' }
    });
  });

  it('should return error for alphanumeric or wrong length', () => {
    const control = new FormControl('41100A');
    expect(validator(control)).toBeTruthy();
  });
});

