import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingQueueComponent } from './pending-queue.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { selectPendingQueue, selectUnderwritingLoading } from '../../state/underwriting.selectors';

describe('PendingQueueComponent', () => {
  let component: PendingQueueComponent;
  let fixture: ComponentFixture<PendingQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingQueueComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectPendingQueue, value: [] },
            { selector: selectUnderwritingLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the pending queue component', () => {
    expect(component).toBeTruthy();
  });
});