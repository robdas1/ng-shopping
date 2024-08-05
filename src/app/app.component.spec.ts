// app.component.spec.ts
// This file contains unit tests for the AppComponent. It utilizes the Angular
// TestBed to create a testing module, mocking necessary services such as the
// NgRx Store. The tests ensure that the AppComponent is created successfully
// and that specific actions are dispatched upon initialization.
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAvailableProducts } from './state/actions/available-product.actions';

// Mock Store service to spy on and assert dispatch calls
class MockStore {
  dispatch = jasmine.createSpy('dispatch');
}

describe('AppComponent', () => {

  // Set up TestBed configuration before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]) // Configure router for testing
      ],
      providers: [
        {
          // Use MockStore as a provider for Store
          provide: Store, useClass: MockStore 
        }
      ]
      // Compile components to initialize the testing environment
    }).compileComponents(); 
  });

  // Test to verify the AppComponent instance is created
  it('should create the app', () => {

    // Arrange - Create the component fixture
    const fixture = TestBed.createComponent(AppComponent);

    // Act - Trigger change detection to simulate lifecycle events
    const app = fixture.componentInstance;

    // Assert that the app component is truthy (exists)
    expect(app).toBeTruthy(); 
  });

  // // Test to check if loadAvailableProducts action is dispatched on initialization
  it('should dispatch loadAvailableProducts action on initialization', () => {
  
    // Arrange - Create the component fixture and inject the Store service to spy on its dispatch method
    const fixture = TestBed.createComponent(AppComponent);
    const store = TestBed.inject(Store); 

    // Act - Trigger change detection to simulate lifecycle events
    fixture.detectChanges();  

    // Assert that the dispatch method was called once with the expected action
    expect(store.dispatch).toHaveBeenCalledOnceWith(loadAvailableProducts());
  });

});