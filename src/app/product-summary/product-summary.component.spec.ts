// Product Summary Component Unit Tests
//
// The tests mock necessary dependencies like ActivatedRoute to
// simulate real-world usage scenarios. Observables are used for mocking because
// Angular's routing mechanism relies on them to handle asynchronous data such as
// route parameters, allowing us to simulate these asynchronous operations in tests.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSummaryComponent } from './product-summary.component';
import { AvailableProduct } from '../models/available-product.interface';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProductSummaryComponent', () => {
  let component: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(async () => {
    // Setup TestBed with ProductSummaryComponent and mock dependencies
    await TestBed.configureTestingModule({
      imports: [ProductSummaryComponent],
      providers: [
        {
          // Mock ActivatedRoute to simulate receiving route parameters
          provide: ActivatedRoute,
          useValue: {

            // Observables are used here because Angular's ActivatedRoute
            // uses them to handle the asynchronous nature of route parameters.
            // This allows us to simulate receiving parameters as if we were
            // navigating to this component in a real application.
            params: of({id: 'testId'}), 
          }
        }
      ]
    })
    .compileComponents(); 

    // Create component instance and initialize it for testing
    fixture = TestBed.createComponent(ProductSummaryComponent);
    component = fixture.componentInstance;

    // Mock the product input to simulate passing data to the component
    const mockProduct: AvailableProduct = {
      id: "00", // Example ID
      productName: "Example Product Name",
      productDetails: "Example product details describing the product.",
      productImageSource: "https://example.com/product-image-source.jpg",
      downloadDate: "2023-01-01",
      productImageFile: "https://example.com/product-image-file.jpg",
      unitPrice: 99.99 // Example unit price
    };
    component.product = mockProduct; // Assign mock product to component input

    fixture.detectChanges(); // Trigger change detection to apply the mock input
  });

  it('should create', () => {
    // Test to verify that the component instance is created successfully
    expect(component).toBeTruthy();
  });
});
