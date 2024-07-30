/**
 * Unit tests for the available-product.reducer
 * 
 * This file contains unit tests for the available-product.reducer, ensuring that it correctly
 * handles actions related to loading available products, including loading, success, and failure scenarios.
 * Each test verifies that the reducer produces the expected state for a given action.
 */
import { availableProductReducer, initialState } from './available-product.reducer';
import { loadAvailableProducts, loadAvailableProductsSuccess, loadAvailableProductsFailure } from '../actions/available-product.actions';
import { AvailableProduct } from '../../models/available-product.interface';
import { Action } from '@ngrx/store';

describe('AvailableProductReducer', () => {

    // Placeholder unit test to always return true
    it('should always pass as a placeholder test', () => {
        expect(true).toBe(true);
    });


    // // Test the initial state
    it('should return the default state', () => {
        const action = { type: 'NOOP' } as Action; // Action that does not affect the state
        const result = availableProductReducer(undefined, action);
        expect(result).toBe(initialState); // Expect the initial state to be returned
    });

    // // Test loading available products
    it('should handle loadAvailableProducts action correctly', () => {
        const action = loadAvailableProducts();
        const result = availableProductReducer(initialState, action);
        expect(result).toEqual(initialState); // Expect the state to remain unchanged
    });

    // // Test successful loading of available products
    it('should handle loadAvailableProductsSuccess action correctly', () => {
        const testProducts: AvailableProduct[] = [
            {
                id: '1',
                productName: 'Product 1',
                productDetails: 'Details of Product 1',
                productImageSource: 'http://example.com/product1.jpg',
                downloadDate: '2023-04-01',
                productImageFile: 'product1.jpg',
                unitPrice: 100
            },
            {
                id: '2',
                productName: 'Product 2',
                productDetails: 'Details of Product 2',
                productImageSource: 'http://example.com/product2.jpg',
                downloadDate: '2023-04-02',
                productImageFile: 'product2.jpg',
                unitPrice: 200
            }
        ];
        const action = loadAvailableProductsSuccess({ availableProducts: testProducts });
        const result = availableProductReducer(initialState, action);
        expect(result).toEqual(testProducts); // Expect the state to be updated with the loaded products
    });

    // Test failure to load available products
    it('should handle loadAvailableProductsFailure action correctly', () => {
        const error = new Error('Failed to load products');
        const action = loadAvailableProductsFailure({ error });
        const result = availableProductReducer(initialState, action);
        expect(result).toEqual(initialState); // Expect the state to remain unchanged on failure
    });
});