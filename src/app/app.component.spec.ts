import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { selectCurrentUser, selectIsAuthenticated, selectUserRole } from './features/auth/state/auth.selectors';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectCurrentUser, value: null },
            { selector: selectIsAuthenticated, value: false },
            { selector: selectUserRole, value: null }
          ]
        })
      ]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'IrrigaShield' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('IrrigaShield');
  });
});

