import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { UserManagerComponent } from './user-manager.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserManagerComponent', () => {
  let component: UserManagerComponent;
  let fixture: ComponentFixture<UserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagerComponent, ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: {
            admin: { users: [], loading: false }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user manager component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle form visibility', () => {
    expect(component.showForm).toBe(false);
    component.toggleForm();
    expect(component.showForm).toBe(true);
  });
});