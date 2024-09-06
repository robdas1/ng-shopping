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
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mock ModalConfirmationComponent
@Component({
  // the selector tells the testing framework which component is to be replaced with MockModalConfirmationComponent
  selector: 'app-confirmation-popup', // The selector for the ModalConfirmationComponent
  standalone: true,
  template: ''  // The template is empty because this is a mock component
})
class MockModalConfirmationComponent {

  // Input properties for the functions to be executed on 'Yes' and 'No' button clicks
  @Input() onYes!: () => void;  
  @Input() onNo!: () => void;   

  openModalConfirmation(message: string) {
    console.debug('MockModalConfirmationComponent openModalConfirmation...');
  }
}

@Component({
  selector: 'app-totals',
  standalone: true,
  template: ''
})
class MockTotalsComponent implements OnInit {
  ngOnInit() {
    console.debug('MockTotalsComponent ngOnInit...');
  }
}

// Mock Router with route configuration
class MockRouter {
  config = [
    { path: 'start', title: 'Start Here' },
    { path: 'stuff', title: 'Stuff' },
    { path: 'cart', title: 'Cart' },
    { path: 'checkout', title: 'Checkout' }
  ];

  navigate = jasmine.createSpy('navigate');
}

describe('CartComponent', () => {

  let mockRouter: MockRouter;

  // "component" holds an instance of CartComponent, allowing interaction with
  // and testing of its properties and methods.
  let component: CartComponent;

  // "fixture" provides a test environment for CartComponent, including access
  // to the component instance and its DOM element.
  let fixture: ComponentFixture<CartComponent>;

  // "store" references the NgRx Store, enabling mocking and testing of
  // interactions with the application's state management.
  let store: Store;

  const mockActivatedRoute = { snapshot: { routeConfig: { title: 'Shopping Cart' } } };

  beforeEach(async () => {
    mockRouter = new MockRouter();

    // Setting up the testing module for CartComponent
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        CartComponent
      ],
      providers: [
        // Providing the NgRx store with the chosenProductReducer
        provideStore({ chosenProducts: chosenProductReducer }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ]
    })
      .overrideComponent(CartComponent, {
        set: {
          imports: [MockModalConfirmationComponent, CommonModule, MockTotalsComponent, RouterLink]
        }
      })
      .compileComponents();

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

  it('should log the title when noRestart is called', () => {
    spyOn(console, 'debug');
    component.noRestart();
    expect(console.debug).toHaveBeenCalledWith('inside CartComponent.noRestart(), title is: ', component.title);
  });


  it('should log the title and navigate to /start when yesRestart is called', () => {
    spyOn(console, 'debug');
    const navigateSpy = mockRouter.navigate;
    component.yesRestart();
    expect(console.debug).toHaveBeenCalledWith('inside CartComponent.yesRestart(), title is: ', component.title);
    expect(navigateSpy).toHaveBeenCalledWith(['/start']);
  });

});
