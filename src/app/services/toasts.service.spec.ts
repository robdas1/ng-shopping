/**
 * ToastsService Unit Tests
 * 
 * This file contains unit tests for the ToastsService. The purpose of these tests is to ensure
 * that the ToastsService behaves as expected. The tests cover the creation of the service, adding
 * toasts with and without options, and removing toasts. Unit tests are essential for verifying
 * that the service functions correctly and handles various scenarios as intended.
 */

import { TestBed } from '@angular/core/testing';

import { Toast, ToastsService } from './toasts.service';

// Describe block defines a test suite for ToastsService
describe('ToastsService', () => {
  let service: ToastsService; // Declaring a variable to hold the service instance

  // beforeEach is a setup method that runs before each test case
  beforeEach(() => {
    // Configuring the testing module for this suite
    TestBed.configureTestingModule({});
    // Injecting the service to test its instance
    service = TestBed.inject(ToastsService);
  });

  // Test case to verify service instantiation
  it('should be created', () => {
    // Asserting the service instance is truthy
    expect(service).toBeTruthy();
  });

  // Test case to verify adding a toast with options
  it('should add a toast when show is called with options', () => {
    const message = 'Test message'; // The message text for the toast
    const options: Partial<Toast> = { classname: 'test-class', delay: 3000 }; // Options for the toast

    // Call the show method to add the toast
    service.show(message, options);

    // Expectations to ensure the toast is added correctly
    expect(service.toasts.length).toBe(1); // Verify the toast list length
    expect(service.toasts[0].message).toBe(message); // Verify the message text
    expect(service.toasts[0].classname).toBe(options.classname); // Verify the CSS class
    expect(service.toasts[0].delay).toBe(options.delay); // Verify the delay
  });

  // Test case to verify adding a toast without options
  it('should add a toast when show is called without options', () => {
    const message = 'Test message'; // The message text for the toast

    // Call the show method to add the toast
    service.show(message);

    // Expectations to ensure the toast is added correctly
    expect(service.toasts.length).toBe(1); // Verify the toast list length
    expect(service.toasts[0].message).toBe(message); // Verify the message text
  });

  // Test case to verify removing a toast
  it('should remove a toast when remove is called', () => {
    const toast: Toast = { message: 'Test message', classname: 'test-class', delay: 3000 }; // A sample toast

    // Add the sample toast to the list
    service.toasts.push(toast);

    // Call the remove method to remove the toast
    service.remove(toast);

    // Expectation to ensure the toast is removed correctly
    expect(service.toasts.length).toBe(0); // Verify the toast list length
  });
});