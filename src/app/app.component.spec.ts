// app.component.spec.ts
// This file contains unit tests for the AppComponent. It utilizes the Angular
// TestBed to create a testing module, mocking necessary services such as the
// NgRx Store. The tests ensure that the AppComponent is created successfully
// and that specific actions are dispatched upon initialization.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAvailableProducts } from './state/actions/available-product.actions';
import { of } from 'rxjs';


// Mock Store service to spy on and assert dispatch calls
class MockStore {
  dispatch = jasmine.createSpy('dispatch');
  select = jasmine.createSpy('select').and.callFake(selector => of([]));
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
    // Creating the component instance and triggering initial data binding and lifecycle hooks
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  // // Test to check if loadAvailableProducts action is dispatched on initialization
  it('should dispatch loadAvailableProducts action on initialization', () => {
  
    // Arrange - inject the Store service to spy on its method methods
    const store = TestBed.inject(Store); 

    // Act - no action needed because change detection to simulate lifecycle events was triggered during setup
    // Assert - that the dispatch method was called once with the expected action
    expect(store.dispatch).toHaveBeenCalledOnceWith(loadAvailableProducts());
  });

});