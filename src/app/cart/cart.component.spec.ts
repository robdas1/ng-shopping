/**
 * cart.component.spec.ts
 * 
 * This file contains unit tests for the CartComponent, ensuring it behaves as
 * expected and integrates correctly with the NgRx Store.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { provideStore } from '@ngrx/store';
import { chosenProductReducer } from '../state/reducers/chosen-product.reducer';
import { Store } from '@ngrx/store';
import { addToCart, removeChosenProduct } from '../state/actions/chosen-product.actions';

describe('CartComponent', () => {

  // "component" holds an instance of CartComponent, allowing interaction with
  // and testing of its properties and methods.
  let component: CartComponent;

  // "fixture" provides a test environment for CartComponent, including access
  // to the component instance and its DOM element.
  let fixture: ComponentFixture<CartComponent>;

  // "store" references the NgRx Store, enabling mocking and testing of
  // interactions with the application's state management.
  let store: Store;

  beforeEach(async () => {
    // Setting up the testing module for CartComponent
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        // Providing the NgRx store with the chosenProductReducer
        provideStore({ chosenProducts: chosenProductReducer })
      ]
    }).compileComponents();

    // Creating the component fixture and instance
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store); // Injecting the store for testing
    fixture.detectChanges(); // Triggering change detection
  });

  // Ensure the CartComponent is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ensure addToCart action is dispatched when addProduct is called
  it('should dispatch AddToCart action when addProduct is called', () => {

    // Arrange: create a test product and spy on the store.dispatch method
    const mockId = 'testId';
    const mockProductName = 'testProductName';
    const mockUnitPrice = 100;
    const expectedPayload = {
      id: mockId,
      productName: mockProductName,
      unitPrice: mockUnitPrice
    };

    // Ensure store.dispatch is spied on before the method call
    spyOn(store, 'dispatch');

    // Act: call addProduct method
    component.addProduct(mockId, mockProductName, mockUnitPrice);

    // Assert: verify if the addToCart action was dispatched with the correct payload
    expect(store.dispatch).toHaveBeenCalledWith(addToCart(expectedPayload));
  });



  // Ensure removeChosenProduct action is dispatched with testProductId when removeProduct is called and testProductId is defined
  it('should dispatch removeChosenProduct action with testProductId when removeProduct is called and testProductId is defined', () => {
    // Arrange: define testProductId and spy on the store.dispatch method
    spyOn(store, 'dispatch');
    // component.testProductId = '01';

    // Act: call removeProduct method
    component.removeProduct('01');

    // Assert: verify if the removeChosenProduct action was dispatched with the correct productId
    expect(store.dispatch).toHaveBeenCalledWith(removeChosenProduct({ productId: '01' }));
  });

});
