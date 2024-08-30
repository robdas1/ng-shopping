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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

describe('ProductDetailComponent', () => {

  // Utilizes a mock version of Store to simulate state management interactions 
  // without actual data.
  class MockStore {

    // simulate the dispatching of actions to the NgRx store 
    dispatch = jasmine.createSpy('dispatch');

    // mock the selection of slices of state from the NgRx store 
    select = jasmine.createSpy('select');
  }

  // Mock the location service
  class MockLocation {
    back = jasmine.createSpy('back');
  }

  // Mock ActivatedRoute with a specific 'id'
  const mockActivatedRoute = {
    snapshot: {
      params: { 'id': 'testId' }
    }
  };

  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]), // Use forRoot with an empty array of routes for testing
        ProductDetailComponent, // Import the standalone component here
      ],
      // Use dependency injection providers to provide mock services
      providers: [
        // Provide the mock store instead of the actual Store service
        { provide: Store, useClass: MockStore },

        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useValue: mockActivatedRoute },

        // Provide the mock Location instead of the actual Location service
        { provide: Location, useClass: MockLocation },
      ],
      // declarations array is removed since the component is standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;

  });

  // Creating the component instance and triggering initial data binding and lifecycle hooks
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the product based on route id parameter on ngOnInit', () => {
    // Get the mock store instance
    const store: MockStore = TestBed.inject(Store) as unknown as MockStore;

    // Triggers change detection to simulate the component's lifecycle events, specifically ngOnInit.
    fixture.detectChanges();

    // Expect the store's select method to have been called with the correct selector
    expect(store.select).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should call goBack method to navigate back to the previous page', () => {
    // Get the mock location instance
    const location: MockLocation = TestBed.inject(Location) as unknown as MockLocation;

    // Triggers change detection to simulate the component's lifecycle events, specifically ngOnInit.
    fixture.detectChanges();

    // Call the goBack method
    component.goBack();

    // Verify that the location.back method was called
    expect(location.back).toHaveBeenCalled();
  });

});