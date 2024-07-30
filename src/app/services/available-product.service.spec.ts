/**
 * available-product.service.spec.ts
 * 
 * This file contains the unit tests for the AvailableProductService, ensuring its
 * reliability in fetching product data. It tests the service's ability to be created,
 * retrieve all products, fetch a specific product by ID, and handle cases where a
 * product ID does not exist in the database. These tests are crucial for maintaining
 * the integrity of the application's product management functionality.
 */
import { TestBed } from '@angular/core/testing';
import { AvailableProductService } from './available-product.service';

// Describe block defines a test suite for AvailableProductService
describe('AvailableProductService', () => {
  let service: AvailableProductService; // Declaring a variable to hold the service instance

  // beforeEach is a setup method that runs before each test case
  beforeEach(() => {

    // Configuring the testing module for this suite
    TestBed.configureTestingModule({});

    // Injecting the service to test its instance
    service = TestBed.inject(AvailableProductService);
  });

  // Test case to verify service instantiation
  it('should be created', () => {
    expect(service).toBeTruthy(); // Asserting the service instance is truthy
  });

  // Test case to verify fetching all available products
  it('should return all available products', (done: DoneFn) => {
    service.getAll().subscribe(products => {

      // Expectations to ensure the service returns an array with more than one product
      expect(products.length).toBeGreaterThan(1);

      // Verifying that product names are not null to ensure valid data
      expect(products[0].productName).not.toBeNull();
      expect(products[1].productName).not.toBeNull();
      done(); // Indicates the asynchronous test is complete
    });
  });

  // Test case to verify fetching a product by its ID
  it('should return a product by id', (done: DoneFn) => {
    service.getById('01').subscribe(product => {

      // Expectations to ensure the service returns the correct product
      expect(product).toBeTruthy(); // Asserts that a product is returned
      expect(product?.id).toBe('01'); // Asserts the product has the correct ID
      expect(product?.productName).toBe('cuppa'); // Asserts the product name is correct
      done(); // Indicates the asynchronous test is complete
    });
  });

  // Test case to verify behavior when a product ID is not found
  it('should return null if product by id is not found', (done: DoneFn) => {
    service.getById('nonexistant_id').subscribe(product => {
      
      // Expectation to ensure the service correctly handles non-existent product IDs
      expect(product).toBeNull(); // Asserts that null is returned for non-existent IDs
      done(); // Indicates the asynchronous test is complete
    });
  });

});