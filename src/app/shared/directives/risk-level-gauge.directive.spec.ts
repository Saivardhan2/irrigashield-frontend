import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskLevelGaugeDirective } from './risk-level-gauge.directive';

@Component({
  standalone: true,
  imports: [RiskLevelGaugeDirective],
  template: `<div [appRiskLevel]="testLevel">Risk Level</div>`
})
class TestHostComponent {
  testLevel = 'LOW';
}

describe('RiskLevelGaugeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
  });

  it('should apply risk-meter and risk-low class', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    host.testLevel = 'LOW';
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList.contains('risk-meter')).toBe(true);
    expect(el.classList.contains('risk-low')).toBe(true);
  });

  it('should apply risk-very-high class for VERY_HIGH', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    host.testLevel = 'VERY_HIGH';
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList.contains('risk-very-high')).toBe(true);
  });
});

