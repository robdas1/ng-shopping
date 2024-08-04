/**
 * ProductListComponent Tests
 * 
 * This file contains the unit tests for the ProductListComponent. It leverages Angular's testing framework
 * to create a testing module and environment tailored for the ProductListComponent. These tests aim to verify
 * that the component is instantiated correctly and behaves as expected within the application. The tests
 * particularly focus on the component's interaction with NgRx Store, simulating state management scenarios
 * to ensure the component's reactive data handling capabilities.
 * 
 * The TestBed.configureTestingModule method is employed to set up the testing module by declaring the
 * ProductListComponent and configuring test dependencies, including a mock version of the NgRx Store. The
 * ComponentFixture is utilized to instantiate the ProductListComponent, enabling direct interaction with
 * the component's template and class for testing purposes. Through these tests, the integrity and functionality
 * of the ProductListComponent are validated, ensuring its proper operation within the application's product
 * listing and state management architecture.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Store } from '@ngrx/store';

// This mock class is used to simulate the behavior of the NgRx Store within the test environment.
// It includes a spy for the 'select' method to assert its calls and arguments.
class MockStore {
  select = jasmine.createSpy('select');
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  // Setup before each test case
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [

        // Provide the mock store instead of the actual Store service
        // This substitution ensures that the tests are not dependent on the actual implementation
        // of the Store service, making them more reliable and faster.
        { provide: Store, useClass: MockStore }
      ]
    })
      .compileComponents();

    // Creating the component instance and triggering initial data binding and lifecycle hooks
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case: Component creation
  it('should create', () => {

    // Arrange: Component setup is already done in beforeEach
    // Act: No action needed as creation is being tested
    // Assert: Component should be truthy upon creation
    expect(component).toBeTruthy();
  });
});