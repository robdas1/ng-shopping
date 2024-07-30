/**
 * available-product.actions.spec.ts
 *
 * This file contains unit tests for the actions defined in available-product.actions.ts.
 * It aims to ensure that each action creator functions as expected, producing the correct
 * action object when invoked. These tests verify the integrity of the actions that are
 * dispatched to manage the state of available products within the application.
 */
import { loadAvailableProducts, loadAvailableProductsSuccess, loadAvailableProductsFailure } from './available-product.actions';
import { AvailableProduct } from '../../models/available-product.interface';

describe('AvailableProduct Actions', () => {

    // Test for loading available products action
    it('loadAvailableProducts should create an action to load available products', () => {

        // Creating the loadAvailableProducts action
        const action = loadAvailableProducts();

        // Asserting the action's type
        expect({ ...action }).toEqual({
            type: '[AvailableProduct] Load Available Products'
        });
    });

    // Test for successful loading of available products
    it('loadAvailableProductsSuccess should create an action when available products are loaded successfully', () => {

        // Updated sample available products for testing with all required properties
        const testProducts: AvailableProduct[] = [{
            id: '01',
            productName: 'Test Product 1',
            productDetails: 'Details for test product 1',
            unitPrice: 100.00,
            productImageSource: 'https://example.com/product1.jpg',
            downloadDate: '2023-04-01',
            productImageFile: 'product1.jpg'
        }, {
            id: '02',
            productName: 'Test Product 2',
            productDetails: 'Details for test product 2',
            unitPrice: 200.00,
            productImageSource: 'https://example.com/product2.jpg',
            downloadDate: '2023-04-02',
            productImageFile: 'product2.jpg'
        }];

        // Creating the loadAvailableProductsSuccess action with updated test products
        const action = loadAvailableProductsSuccess({ availableProducts: testProducts });

        // Asserting the action's type and payload
        expect({ ...action }).toEqual({
            type: '[AvailableProduct] Load Available Products Success',
            availableProducts: testProducts
        });
    });

    // Test for failure in loading available products
    it('loadAvailableProductsFailure should create an action when there is an error loading available products', () => {

        // Sample error for testing
        const error = { message: 'Error loading products' };

        // Creating the loadAvailableProductsFailure action with the test error
        const action = loadAvailableProductsFailure({ error });

        // Asserting the action's type and error payload
        expect({ ...action }).toEqual({
            type: '[AvailableProduct] Load Available Products Failure',
            error
        });
    });
});