/**
 * start-page.component.spec.ts
 * 
 * This file contains unit tests for the StartPageComponent. The purpose of these tests is to
 * ensure that the StartPageComponent behaves as expected. The tests cover the creation of the
 * component, navigation functionality, and interaction with the NgRx Store. Mock classes are
 * used to replace the Router and Store services to isolate the component's behavior.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageComponent } from './start-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Mock Router class to simulate navigation behavior
class MockRouter {
  navigate = jasmine.createSpy('navigate'); // Spy on the navigate method
}

// Mock Store class to simulate NgRx Store behavior
class MockStore {
  dispatch = jasmine.createSpy('dispatch'); // Spy on the dispatch method
}

// Describe block defines a test suite for StartPageComponent
describe('StartPageComponent', () => {
  let component: StartPageComponent; // Variable to hold the component instance
  let fixture: ComponentFixture<StartPageComponent>; // Variable to hold the fixture
  let router: Router; // Variable to hold the router instance

  // Mock ActivatedRoute to provide route configuration
  const mockActivatedRoute = { snapshot: { routeConfig: { title: 'Start Here' } } };

  // beforeEach is a setup method that runs before each test case
  beforeEach(async () => {
    // Configure the testing module for this suite
    await TestBed.configureTestingModule({
      imports: [StartPageComponent], // Import the component under test
      providers: [
        // Use the MockRouter class instead of the real Router service
        { provide: Router, useClass: MockRouter },
        // Use the MockStore class instead of the real Store service
        { provide: Store, useClass: MockStore },
        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents(); // Compile the components

    // Create the component fixture
    fixture = TestBed.createComponent(StartPageComponent);
    // Inject the router instance
    router = TestBed.inject(Router);
    // Get the component instance from the fixture
    component = fixture.componentInstance;
    // Trigger initial data binding
    fixture.detectChanges();
  });

  // Test case to verify component instantiation
  it('should create', () => {
    // Assert that the component instance is truthy
    expect(component).toBeTruthy();
  });

  // Test case to verify navigation to /stuff
  it('should navigate to /stuff', () => {
    // Call the navigateToStuff method
    component.navigateToStuff();
    // Assert that the navigate method was called with the correct URL
    expect(router.navigate).toHaveBeenCalledWith(['/stuff']);
  });

});