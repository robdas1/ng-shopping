/**
 * @file header.component.spec.ts
 * @description Unit test for the HeaderComponent in an Angular 18 application using standalone components.
 * 
 * This file tests the HeaderComponent, which is a standalone component that includes another custom 
 * component called CartSummaryComponent. The goal of this test is to ensure that HeaderComponent works as 
 * expected while replacing CartSummaryComponent with a mock component, MockCartSummaryComponent, to isolate 
 * the test from dependencies that aren't directly related to HeaderComponent.
 * 
 * Key challenges include ensuring that the mock component is used instead of the real component in the test. 
 * These challenges were overcome by carefully configuring the TestBed and using TestBed.overrideComponent 
 * to inject the mock component and reserve necessary imports for routing and navigation.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Mock CartSummaryComponent
@Component({
  selector: 'app-cart-summary',
  standalone: true,
  template: ''  // The template is empty because this is a mock component
})
class MockCartSummaryComponent implements OnInit {

  // Debugging message to confirm when this mock is used
  ngOnInit() {
    console.debug('MockCartSummaryComponent ngOnInit...');
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
}

// Mock ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    routeConfig: {
      title: 'Mock Title'
    }
  }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();

    // Setting up the test environment for HeaderComponent
    await TestBed.configureTestingModule({

      imports: [

        // Importing router module to satisfy router dependencies
        RouterModule.forRoot([]),

        // Import the actual HeaderComponent for testing
        HeaderComponent,
      ],

      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]

    })
      .overrideComponent(HeaderComponent, {

        // Override CartSummaryComponent with MockCartSummaryComponent
        set: {
          imports: [
            NgbNavModule,
            MockCartSummaryComponent
          ],
        }

      })
      .compileComponents();

    // Create the component instance
    fixture = TestBed.createComponent(HeaderComponent);

    // Access the component instance
    component = fixture.componentInstance;

    // Trigger Angular's change detection
    fixture.detectChanges();
  });

  it('should create', () => {

    // Arrange, Act: Component setup is already done in beforeEach
    // Assertion to verify the component is created
    expect(component).toBeTruthy();
  });

  it('should populate routeTitles correctly on ngOnInit', () => {

    // Arrange: Define the expected route titles 
    const expectedTitles = {
      'start': 'Start Here',
      'stuff': 'Stuff',
      'cart': 'Cart',
      'checkout': 'Checkout'
    };

    // Act: implicitly handled by fixture.detectChanges() in beforeEach
    // Assert: Verify the routeTitles are populated correctly
    expect(component.routeTitles).toEqual(expectedTitles);
  });


});
