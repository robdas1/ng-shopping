/**
 * AvailableProductEffects Unit Tests
 * 
 * This file contains unit tests for the AvailableProductEffects class, which manages side effects
 * for actions related to available products in the application. These tests aim to ensure that the
 * correct actions are dispatched in response to specific triggers, and that the effects properly handle
 * the interactions with the AvailableProductService.
 * 
 * The tests utilize the Angular TestBed for setting up an environment that mimics the Angular dependency
 * injection system, and the NgRx Effects testing utilities to simulate actions and observe the outcomes.
 * 
 * Key areas tested include:
 * - The dispatch of the loadAvailableProductsSuccess action when the AvailableProductService successfully
 *   returns available products.
 * - The dispatch of the loadAvailableProductsFailure action when the AvailableProductService fails to
 *   return available products.
 * - Proper handling and logging of actions within the effects.
 */
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AvailableProductEffects } from './available-product.effects';
import { AvailableProductService } from '../../services/available-product.service';
import { loadAvailableProducts, loadAvailableProductsSuccess, loadAvailableProductsFailure } from '../actions/available-product.actions';
import { AvailableProduct } from '../../models/available-product.interface';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';

describe('AvailableProductEffects', () => {
    let effects: AvailableProductEffects;
    let actions$: Observable<Action>;
    let availableProductService: jasmine.SpyObj<AvailableProductService>;

    beforeEach(() => {

        // Configure the testing module to mock dependencies
        TestBed.configureTestingModule({
            providers: [
                AvailableProductEffects,
                provideMockActions(() => actions$), // Provide a stream of actions
                provideMockStore({}), // Mock NgRx store
                {
                    provide: AvailableProductService, // Mock the AvailableProductService
                    useValue: jasmine.createSpyObj('AvailableProductService', ['getAll'])
                }
            ]
        });

        // Inject the dependencies
        effects = TestBed.inject(AvailableProductEffects);
        availableProductService = TestBed.inject(AvailableProductService) as jasmine.SpyObj<AvailableProductService>;
    });

    // Test case for successful loading of available products
    it('should dispatch loadAvailableProductsSuccess when available products are loaded successfully', (done) => {

        // Mock products to simulate a successful service response
        const mockProducts: AvailableProduct[] = [{
            id: '1',
            productName: 'Test Product',
            productDetails: 'Details for Test Product',
            productImageSource: 'https://example.com/product1.jpg',
            downloadDate: '2023-04-01',
            productImageFile: 'product1.jpg',
            unitPrice: 100
        }];

        // Mock the service call to return the mock products
        availableProductService.getAll.and.returnValue(of(mockProducts));

        // Simulate the action to load available products
        actions$ = of(loadAvailableProducts());

        // Subscribe to the effect and verify the outcome
        effects.loadAvailableProductsEffect$.subscribe(action => {

            // Expect the success action to be dispatched with the mock products
            expect(action).toEqual(loadAvailableProductsSuccess({ availableProducts: mockProducts }));
            done();
        });
    });

    // Test case for handling errors when loading available products fails
    it('should dispatch loadAvailableProductsFailure when there is an error loading available products', (done) => {

        // Mock an error response to simulate a service failure
        const error = new Error('An error occurred');
        availableProductService.getAll.and.returnValue(throwError(error));

        // Simulate the action to load available products
        actions$ = of(loadAvailableProducts());

        // Subscribe to the effect and verify the outcome
        effects.loadAvailableProductsEffect$.subscribe(action => {

            // Expect the failure action to be dispatched with the error
            expect(action).toEqual(loadAvailableProductsFailure({ error }));
            done();
        });
    });

});