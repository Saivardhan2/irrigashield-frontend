import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeDirective } from './status-badge.directive';

@Component({
  standalone: true,
  imports: [StatusBadgeDirective],
  template: `<span [appStatusBadge]="testStatus">Status Text</span>`
})
class TestHostComponent {
  testStatus = 'ACTIVE';
}

describe('StatusBadgeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
  });

  it('should apply badge and badge-success for ACTIVE', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    host.testStatus = 'ACTIVE';
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('badge')).toBe(true);
    expect(el.classList.contains('badge-success')).toBe(true);
  });

  it('should apply badge-warning for SUBMITTED', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    host.testStatus = 'SUBMITTED';
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('badge-warning')).toBe(true);
  });

  it('should apply badge-danger for REJECTED', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    host.testStatus = 'REJECTED';
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('badge-danger')).toBe(true);
  });
});

