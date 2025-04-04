/**
 * checkout.component.spec.ts
 * 
 * This file contains unit tests for the CheckoutComponent, ensuring it behaves as
 * expected and integrates correctly with the NgRx Store.
 */
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { updateCardExpiration, updatePaymentMethod } from '../state/actions/payment-info.actions';
import { selectCardExpiration, selectPaymentMethod } from '../state/selectors/payment-info.selectors';
import { updateCustomerAddress, updateCustomerName } from '../state/actions/shipping-info.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ChosenProduct } from '../models/chosen-product.interface';
import { selectCustomerAddress, selectCustomerName } from '../state/selectors/shipping-info.selectors';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-totals',
  template: '',
  standalone: true
})
// Mock TotalsComponent to isolate the testing environment and remove dependencies.
// Specifically, the TotalsComponent depends on the NgRx store, which is not needed for this test.
class MockTotalsComponent { }

// Mock ModalNotificationComponent
class MockModalNotificationComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  openModalNotification(message: string) {}
}

describe('CheckoutComponent', () => {

  // The mockStore variable is a mock version of the NgRx store used for testing
  // purposes. It allows us to simulate state changes and interactions.
  let mockStore: MockStore;

  // The standaloneComponent variable represents an instance of the
  // CheckoutComponent, which is under test.
  let standaloneComponent: CheckoutComponent;
  let mockModalNotificationComponent: MockModalNotificationComponent;

  const mockActivatedRoute = {
    snapshot: {
      routeConfig: {
        title: 'Checkout'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockTotalsComponent
      ],
      providers: [
        provideMockStore(), // Sets up the MockStore for tests
        CheckoutComponent, // Includes the component under test
        { provide: MockModalNotificationComponent, useClass: MockModalNotificationComponent },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]

    })
      .overrideComponent(CheckoutComponent, {
        set: {
          imports: [MockTotalsComponent] // Override the imports of CheckoutComponent to use the mock
        }
      })
      .compileComponents();

  });

  it('should alert when onPurchase is called', () => {

    // Arrange: Initialize the mock store and the component under test
    mockStore = TestBed.inject(MockStore);
    mockModalNotificationComponent = TestBed.inject(MockModalNotificationComponent);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);
    standaloneComponent.modalComponent = mockModalNotificationComponent as ModalNotificationComponent; // Inject the mock modal component
    spyOn(mockModalNotificationComponent, 'openModalNotification');
    
    // Act: Call the onPurchase method
    standaloneComponent.onPurchase();
    
    // Assert: Verify the alert was called with the correct message
    expect(mockModalNotificationComponent.openModalNotification).toHaveBeenCalledWith('Payment not accepted. The payment system is not yet available.');
  });


  it('should enable purchase when all required fields are filled', (done) => {
    // Arrange: Define mock values for the required fields
    const mockPaymentMethod = 'credit card';
    const mockCardExpiration = new Date();
    const mockCustomerName = 'John Doe';
    const mockCustomerAddress = '123 Main St';
    const mockChosenProducts: ChosenProduct[] = [{ id: "1", productName: 'Product 1', unitPrice: 100, qty: 1 }];
  
    // Initialize the mock store and the component under test
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);
  
    // Override selectors to return the mock values
    mockStore.overrideSelector(selectPaymentMethod, mockPaymentMethod);
    mockStore.overrideSelector(selectCardExpiration, mockCardExpiration);
    mockStore.overrideSelector(selectCustomerName, mockCustomerName);
    mockStore.overrideSelector(selectCustomerAddress, mockCustomerAddress);
    mockStore.overrideSelector(selectChosenProductsState, mockChosenProducts);
  
    // Act: Trigger the component's ngOnInit lifecycle method
    standaloneComponent.ngOnInit();
  
    // Assert: Subscribe to the isPurchaseEnabled$ observable and verify it emits true
    standaloneComponent.isPurchaseEnabled$.subscribe(isEnabled => {
      expect(isEnabled).toBeTrue();
      done();
    });
  });

  it('should initialize paymentMethod$ observable with the current payment method from store', () => {

    // Initialize mockStore and standaloneComponent with mockStore
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Mock selectors
    mockStore.overrideSelector(selectPaymentMethod, "credit card");

    // Spy on store.select to ensure it's called with the correct selectors
    spyOn(mockStore, 'select').and.callThrough();

    standaloneComponent.ngOnInit();
    standaloneComponent.paymentMethod$.subscribe(method => {
      expect(method).toEqual("credit card");
    });
    expect(mockStore.select).toHaveBeenCalledWith(selectPaymentMethod);
  });


  it('should transform cardExpiration$ to a formatted string in cardExpirationString$', () => {

    // Initialize mockStore and standaloneComponent with mockStore
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Mock selectors
    mockStore.overrideSelector(selectCardExpiration, new Date('2023-12-31'));

    // Spy on store.select to ensure it's called with the correct selectors
    spyOn(mockStore, 'select').and.callThrough();

    standaloneComponent.ngOnInit();
    standaloneComponent.cardExpirationString$.subscribe(formattedDate => {
      expect(formattedDate).toEqual('2023-12-31');
    });
  });


  it('should create', () => {
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);
    expect(standaloneComponent).toBeTruthy();
  });

  it('should format date correctly', () => {
    // Arrange: Create a new date for testing.
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    const testDate = new Date('2023-04-15T00:00:00Z'); // Use a fixed date for consistency.
    const expectedFormattedDate = '2023-04-15'; // Expected result in 'YYYY-MM-DD' format.

    // Act: Call the formatDate method with the test date.
    const formattedDate = standaloneComponent.formatDate(testDate);

    // Assert: Check if the formatted date matches the expected result.
    expect(formattedDate).toEqual(expectedFormattedDate);
  });

  it('should dispatch updateCardExpiration action with the new expiration date when onChangeCardExpiration is called', () => {
    // Arrange: Create a new date for testing and simulate an input event with this date.
    const testDate = new Date('2023-12-31');
    const testEvent = {
      target: { value: testDate.toISOString().split('T')[0] } // 'YYYY-MM-DD'
    } as unknown as Event;

    // Initialize mockStore and standaloneComponent with mockStore injected
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Spy on the store's dispatch method to verify it's called with the correct action and payload.
    spyOn(mockStore, 'dispatch');

    // Act: Call onChangeCardExpiration with the simulated event.
    standaloneComponent.onChangeCardExpiration(testEvent);

    // Assert: Verify the correct action is dispatched with the new expiration date.
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateCardExpiration({ cardExpiration: testDate }));
  });

  it('should dispatch updatePaymentMethod action with the new payment method when onChangePaymentMethod is called', () => {
    // Arrange: Simulate a select element event with a new payment method value.
    const testEvent = {
      target: { value: 'credit card' } // Assuming 'credit card' is selected
    } as unknown as Event;

    // Initialize mockStore and standaloneComponent with mockStore injected
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Spy on the store's dispatch method to verify it's called with the correct action and payload.
    spyOn(mockStore, 'dispatch');

    // Act: Call onChangePaymentMethod with the simulated event.
    standaloneComponent.onChangePaymentMethod(testEvent);

    // Assert: Verify the correct action is dispatched with the new payment method.
    expect(mockStore.dispatch).toHaveBeenCalledWith(updatePaymentMethod({ paymentMethod: 'credit card' }));
  });


  it('should dispatch updateCustomerName action with the new customer name when onChangeCustomerName is called', () => {
    // Arrange: Simulate an input element event with a new customer name value.
    const testEvent = {
      target: { value: 'John Doe' } // Assuming 'John Doe' is entered
    } as unknown as Event;

    // Initialize mockStore and standaloneComponent with mockStore injected
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Spy on the store's dispatch method to verify it's called with the correct action and payload.
    spyOn(mockStore, 'dispatch');

    // Act: Call onChangeCustomerName with the simulated event.
    standaloneComponent.onChangeCustomerName(testEvent);

    // Assert: Verify the correct action is dispatched with the new customer name.
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateCustomerName({ customerName: 'John Doe' }));
  });

  it('should dispatch updateCustomerName action with the null customer name when onChangeCustomerName is called with null', () => {
    // Arrange: Simulate an input element event with a new customer name value.
    const testEvent = {
      target: { value: null } // Assuming 'John Doe' is entered
    } as unknown as Event;

    // Initialize mockStore and standaloneComponent with mockStore injected
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Spy on the store's dispatch method to verify it's called with the correct action and payload.
    spyOn(mockStore, 'dispatch');

    // Act: Call onChangeCustomerName with the simulated event.
    standaloneComponent.onChangeCustomerName(testEvent);

    // Assert: Verify the correct action is dispatched with the new customer name.
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateCustomerName({ customerName: null }));
  });

  it('should dispatch updateCustomerAddress action with the new customer address when onChangeCustomerAddress is called', () => {
    // Arrange: Simulate an input element event with a new customer address value.
    const testEvent = {
      target: { value: '123 Main St' } // Assuming '123 Main St' is entered
    } as unknown as Event;

    // Initialize mockStore and standaloneComponent with mockStore injected
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Spy on the store's dispatch method to verify it's called with the correct action and payload.
    spyOn(mockStore, 'dispatch');

    // Act: Call onChangeCustomerAddress with the simulated event.
    standaloneComponent.onChangeCustomerAddress(testEvent);

    // Assert: Verify the correct action is dispatched with the new customer address.
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateCustomerAddress({ customerAddress: '123 Main St' }));
  });

  it('should dispatch updateCustomerAddress action with the null customer address when onChangeCustomerAddress is called with null', () => {
    // Arrange: Simulate an input element event with a new customer address value.
    const testEvent = {
      target: { value: null } // Assuming '123 Main St' is entered
    } as unknown as Event;

    // Initialize mockStore and standaloneComponent with mockStore injected
    mockStore = TestBed.inject(MockStore);
    standaloneComponent = new CheckoutComponent(mockStore as Store<AppState>, mockActivatedRoute as ActivatedRoute);

    // Spy on the store's dispatch method to verify it's called with the correct action and payload.
    spyOn(mockStore, 'dispatch');

    // Act: Call onChangeCustomerAddress with the simulated event.
    standaloneComponent.onChangeCustomerAddress(testEvent);

    // Assert: Verify the correct action is dispatched with the new customer address.
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateCustomerAddress({ customerAddress: null }));
  });
  

});