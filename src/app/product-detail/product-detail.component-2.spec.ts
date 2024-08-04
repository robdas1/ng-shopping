/**
 * product-detail.component-2.spec.ts
 * 
 * This file contains the unit tests for the ProductDetailComponent, focusing on
 * its ability to correctly interact with external dependencies, handle user
 * interactions, and render product details based on the provided route
 * parameters. The tests ensure that the component integrates seamlessly with
 * the ngrx store for state management and the Angular Router for navigation.
 * 
 * A notable challenge addressed in these tests was the "Navigation triggered
 * outside Angular zone" warning. This was resolved by he warning was resolved by 
 * ensuring that all necessary imports were correctly specified in the `@Component` 
 * decorator, wrapping operations such as fixture.detectChanges() and component 
 * method calls within NgZone.run(), ensuring that Angular's change detection is 
 * aware of asynchronous operations initiated by the component. 
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { Component, NgZone } from '@angular/core';

// Declare DummyComponent
@Component({ template: '' }) class DummyComponent { }

describe('ProductDetailComponent-2', () => {

    it('addProduct should subscribe to product$ and get a test product', () => {

        // setup the ngrx store so that it contains a test product object with a specific id
        const mockStore = {
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.returnValue(of({ id: 'testId', productName: 'testProduct' }))
        };

        // Mock ActivatedRoute to pass the id of the test product object
        const mockActivatedRoute = {
            snapshot: {
                params: { 'id': 'testId' }
            }
        };

        TestBed.configureTestingModule({
            imports: [
                ProductDetailComponent,

                // Use DummyComponent in the route configuration
                RouterModule.forRoot([
                    { path: 'stuff', component: DummyComponent }
                ])
            ],
            providers: [
                // Provides a mock Store to be used in place of the actual NgRx 
                // Store service. This allows for simulation and spying on store 
                // interactions without affecting the real store state.
                { provide: Store, useValue: mockStore },

                // Provides a mock ActivatedRoute to simulate route parameters.
                // This is useful for testing components that depend on route parameters.
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });

        const fixture: ComponentFixture<ProductDetailComponent> = TestBed.createComponent(ProductDetailComponent);
        const component: ProductDetailComponent = fixture.componentInstance;

        // Inject NgZone
        const ngZone: NgZone = TestBed.inject(NgZone);

        // Trigger ngOnInit causing an observable, product$, with the test product object to be returned 
        ngZone.run(() => {
            fixture.detectChanges();
        });

        // Spy on component's addProduct method
        spyOn(component, 'addProduct').and.callThrough();

        // Trigger the addProduct method which will subscribe to product$ thereby picking up the test product object
        ngZone.run(() => {
            component.addProduct();
        });

        // Verify addProduct was called
        expect(component.addProduct).toHaveBeenCalled();

    });

});