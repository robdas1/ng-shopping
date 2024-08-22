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
import { selectChosenProductsState } from './state/selectors/chosen-product.selectors';
import { selectTaxRate } from './state/selectors/tax-rate.selectors';
import { ChosenProduct } from './models/chosen-product.interface';

describe('AppComponent', () => {

  // Mock data for testing
  const mockChosenProducts: ChosenProduct[] = [
    { id: '01', productName: 'Test Product', unitPrice: 100.00, qty: 1 },
    { id: '02', productName: 'Another Test Product', unitPrice: 150.00, qty: 2 }
  ];

  const mockTaxRate = 0.05; // 5%

  // Mock Store service to spy on and assert dispatch calls, and return mock data for selectors
  class MockStore {
    dispatch = jasmine.createSpy('dispatch');
    select = jasmine.createSpy('select').and.callFake(selector => {
      if (selector === selectChosenProductsState) {
        return of(mockChosenProducts);
      } else if (selector === selectTaxRate) {
        return of(mockTaxRate);
      }
      return of([]);
    });
  }

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  // Set up TestBed configuration before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]) // Configure router for testing
      ],
      providers: [
        {
          provide: Store, useClass: MockStore // Provide the MockStore service for testing
        }
      ]

      // Compile components to initialize the testing environment
    }).compileComponents();

    // Creating the component instance and triggering initial data binding and lifecycle hooks
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    // Arrange - all setup is done in the beforeEach function
    // Act - no action needed because change detection to simulate lifecycle events was triggered during setup
    // Assert - that the component was created successfully
    expect(component).toBeTruthy();
  });

  it('should dispatch loadAvailableProducts action on initialization', async () => {

    // Arrange - all setup is done in the beforeEach function
    // Act - no action needed because change detection to simulate lifecycle events was triggered during setup
    // Assert - that the dispatch method was called once with the expected action
    expect(store.dispatch).toHaveBeenCalledOnceWith(loadAvailableProducts());
  });

  it('should calculate the correct sum', (done) => {

    // Arrange - calculate the expected grand total based on the mock data
    const expectedGrandTotal = mockChosenProducts.reduce((sum, product) => sum + (product.qty * product.unitPrice), 0) * (1 + mockTaxRate);

    // Act - no action needed because change detection to simulate lifecycle events was triggered during setup and the grand total is calculated in the ngOnInit lifecycle hook
    // Assert - that the grand total is calculated correctly
    component.grandTotal$.subscribe(grandTotal => {
      expect(grandTotal).toEqual(expectedGrandTotal);
      done();
    });

  });

});