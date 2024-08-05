/**
 * TotalsComponent Tests
 * 
 * This file contains unit tests for the TotalsComponent, focusing on its ability
 * to accurately calculate and display the subtotal, tax, and grand total values
 * based on the chosen products in the application. It leverages Angular's testing
 * utilities to simulate interactions with the NgRx store, ensuring that the
 * component behaves as expected when products are added or removed from the state.
 */
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TotalsComponent } from './totals.component';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

describe('TotalsComponent', () => {

  // The mockStore variable is a mock version of the NgRx store used for testing
  // purposes. It allows us to simulate state changes and interactions.
  let mockStore: MockStore;

  // The standaloneComponent variable represents an instance of the
  // TotalsComponent, which is under test.
  let standaloneComponent: TotalsComponent;

  beforeEach(async () => {

    // The TestBed configuration sets up the testing environment for the
    // TotalsComponent. It provides a mock store to mimic the application's
    // state management.
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore(), // Sets up the MockStore for tests.
        TotalsComponent // Includes the component under test.
      ]
    })
    .compileComponents();

    // Injecting the mock store into the test environment and creating an
    // instance of the TotalsComponent with it. This setup mimics the component's
    // real environment as closely as possible.
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new TotalsComponent(mockStore as Store<AppState>);
  });
  
  it('should correctly calculate subtotal considering custom quantities', () => {
    
    // Directly setting the state in the mock store to predefined values. This
    // simulates a specific application state for testing the component's
    // behavior under these conditions.
    mockStore.setState({
      chosenProducts: [
        { id: '01', productName: 'Product 1', unitPrice: 10.00, qty: 3 },
        { id: '03', productName: 'Product 3', unitPrice: 30.00, qty: 2 }
      ]
    });
    
    // Initializing the component to trigger any setup logic, such as
    // subscriptions to the store. This is crucial for the test to reflect the
    // component's real behavior as closely as possible.
    standaloneComponent.ngOnInit();

    // The expectedSubtotal variable represents the manually calculated subtotal
    // based on the mock state provided. This serves as the expected result to
    // validate the component's calculation logic.
    const expectedSubtotal = 90; // (10 * 3) + (30 * 2) = 90

    // Asserting that the component's calculated subtotal matches the expected
    // subtotal. This verifies that the component correctly calculates the
    // subtotal based on the chosen products in the state, considering custom
    // quantities.
    expect(standaloneComponent.subtotal).toEqual(expectedSubtotal);
  });
});