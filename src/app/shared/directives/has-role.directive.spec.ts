import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HasRoleDirective } from './has-role.directive';
import { selectUserRole } from '../../features/auth/state/auth.selectors';

@Component({
  standalone: true,
  imports: [HasRoleDirective],
  template: `
    <div *appHasRole="['ADMIN', 'FARMER']" id="allowed-content">Visible for Farmer and Admin</div>
  `
})
class TestHostComponent {}

describe('HasRoleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectUserRole, value: 'FARMER' }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render content when user has allowed role', () => {
    const el = fixture.nativeElement.querySelector('#allowed-content');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Visible for Farmer and Admin');
  });

  it('should remove content when user role is not allowed', () => {
    store.overrideSelector(selectUserRole, 'DATA_PROVIDER');
    store.refreshState();
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#allowed-content');
    expect(el).toBeFalsy();
  });
});

