import { FormControl } from '@angular/forms';
import { coverageBoundsValidator } from './coverage-bounds.validator';

describe('coverageBoundsValidator', () => {
  const validator = coverageBoundsValidator(50000, 500000);

  it('should return null when value is within range', () => {
    const control = new FormControl(200000);
    expect(validator(control)).toBeNull();
  });

  it('should return null when value is at exact boundary', () => {
    expect(validator(new FormControl(50000))).toBeNull();
    expect(validator(new FormControl(500000))).toBeNull();
  });

  it('should return error when value is below minimum', () => {
    const control = new FormControl(30000);
    expect(validator(control)).toEqual({
      minCoverageBreached: { min: 50000, actual: 30000, message: 'Minimum coverage required is ₹50000' }
    });
  });

  it('should return error when value exceeds maximum', () => {
    const control = new FormControl(600000);
    expect(validator(control)).toEqual({
      maxCoverageBreached: { max: 500000, actual: 600000, message: 'Maximum coverage allowed is ₹500000' }
    });
  });
});

