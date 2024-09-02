/**
 * cart-summary.component.spec.ts
 * 
 * This file contains unit tests for the CartSummaryComponent, ensuring it behaves as expected and 
 * integrates correctly with the NgRx Store. The tests verify that the component is created 
 * successfully and that it calculates the total number of items in the cart correctly.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartSummaryComponent } from './cart-summary.component';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { ChosenProduct } from '../models/chosen-product.interface';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('CartSummaryComponent', () => {
  // Declare variables for the component, fixture, and store
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let store: MockStore;

  // Define the initial state for the mock store
  const initialState = { chosenProducts: [] };

  // Set up the testing module before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      // Import the CartSummaryComponent
      imports: [CartSummaryComponent],

      providers: [
        provideMockStore({ initialState }), // Provide the mock store with the initial state
        provideRouter([]) // Use provideRouter for router-related tests
      ]
    })
      .compileComponents(); // Compile the components

    // Inject the mock store
    store = TestBed.inject(MockStore);

    // Create the component fixture
    fixture = TestBed.createComponent(CartSummaryComponent);

    // Get the component instance
    component = fixture.componentInstance;

    // Trigger change detection
    fixture.detectChanges();
  });

  // Test to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the total items are calculated correctly
  it('should calculate total items correctly', () => {

    // Arrange: Set up mock products and override the selector
    const mockProducts: ChosenProduct[] = [
      { id: "1", productName: 'Product 1', qty: 2, unitPrice: 10 },
      { id: "2", productName: 'Product 2', qty: 3, unitPrice: 20 }
    ];

    // Override the selector to return the mock products
    store.overrideSelector(selectChosenProductsState, mockProducts);

    // Refresh the state to apply the override
    store.refreshState();

    // Trigger change detection
    fixture.detectChanges();

    // Act: No additional action needed as we are testing the calculation
    // Assert: Verify that the total items are calculated correctly
    expect(component.totalItems).toBe(5);
  });

  it('should navigate to /cart when navigateToCart is called', () => {
    // Arrange: Set up a spy on the router's navigate method
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    // Act: Call the navigateToCart method
    component.navigateToCart();

    // Assert: Verify that the navigate method was called with the correct argument
    expect(navigateSpy).toHaveBeenCalledWith(['/cart']);
  });


});