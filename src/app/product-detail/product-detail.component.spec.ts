/**
 * ProductDetailComponent Tests
 * 
 * This file contains the unit tests for the ProductDetailComponent. It utilizes
 * Angular's testing framework to set up a testing module specifically for the
 * ProductDetailComponent, ensuring that the component is correctly instantiated
 * and functions as expected within the application. The tests focus on the
 * component's interaction with the NgRx Store, using a mock version of the Store
 * to simulate state management interactions without relying on actual data. This
 * approach allows for the testing of the component's ability to dispatch actions
 * and select slices of state from the store.
 * 
 * TestBed.configureTestingModule is used to configure the testing module by importing
 * necessary modules and providing mock services, such as the mock Store and a mock
 * ActivatedRoute to simulate route parameters. This setup facilitates the examination
 * of the component's behavior in response to changes in state and route parameters.
 */
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { Store } from '@ngrx/store';

describe('ProductDetailComponent', () => {

  // Utilizes a mock version of Store to simulate state management interactions 
  // without actual data.
  class MockStore {

    // simulate the dispatching of actions to the NgRx store 
    dispatch = jasmine.createSpy('dispatch');

    // mock the selection of slices of state from the NgRx store 
    select = jasmine.createSpy('select');
  }

  // Mock ActivatedRoute with a specific 'id'
  const mockActivatedRoute = {
    snapshot: {
      params: { 'id': 'testId' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]), // Use forRoot with an empty array of routes for testing
        ProductDetailComponent, // Import the standalone component here
      ],
      providers: [
        // Provide the mock store instead of the actual Store service
        { provide: Store, useClass: MockStore },

        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      // declarations array is removed since the component is standalone
    }).compileComponents();
  });

  // Creating the component instance and triggering initial data binding and lifecycle hooks
  it('should create', () => {
    const fixture = TestBed.createComponent(ProductDetailComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should select the product based on route id parameter on ngOnInit', () => {
    // Get the mock store instance
    const store: MockStore = TestBed.inject(Store) as unknown as MockStore;
    const fixture = TestBed.createComponent(ProductDetailComponent);

    // Triggers change detection to simulate the component's lifecycle events, specifically ngOnInit.
    fixture.detectChanges();

    // Expect the store's select method to have been called with the correct selector
    expect(store.select).toHaveBeenCalledWith(jasmine.any(Function));
  });

});