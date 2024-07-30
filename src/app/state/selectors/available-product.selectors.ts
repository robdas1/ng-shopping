/**
 * Available Product Selectors
 * 
 * This file contains the selectors for the availableProducts state slice. Selectors are
 * functions used to select, derive, and compose pieces of state. This file specifically includes
 * selectors to access the entire availableProducts state slice, individual available products by ID, and
 * any other derived state specific to avail products. These selectors ensure a consistent and
 * optimized method of accessing state throughout the application, particularly for the availableProducts
 * feature.
 * 
 * The string "availableProducts" used here for selecting a state slice is derived from the AppState 
 * interface definition's property name. This property name is used in the StoreModule.forRoot() method.
 */
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AvailableProduct } from 'src/app/models/available-product.interface';

// Selector to get the availableProducts slice of the AppState.
export const selectAvailableProductsState = 
  createFeatureSelector<AvailableProduct[]>('availableProducts');

// Selector to get an available product by id.
export const selectAvailableProductById = (id: string) => createSelector(
  createFeatureSelector<AvailableProduct[]>('availableProducts'),
  (availableProducts: AvailableProduct[]) => 
    availableProducts.find(availableProduct => availableProduct.id === id) || null
);