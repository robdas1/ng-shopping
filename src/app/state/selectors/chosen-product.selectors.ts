/**
 * Chosen Product Selectors
 * 
 * This file contains the selectors for the chosenProducts state slice. Selectors are
 * functions used to select pieces of state. This file specifically includes
 * a selector to access the entire chosenProducts state slice. These selectors ensure a consistent and
 * optimized method of accessing state throughout the application, particularly for the chosenProducts
 * feature.
 * 
 * The string "chosenProducts" used here for selecting a state slice is derived from the AppState 
 * interface definition's property name. This property name is used in the StoreModule.forRoot() method.
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChosenProduct } from 'src/app/models/chosen-product.interface';

// Selector to get the chosenProducts slice of the AppState.
export const selectChosenProductsState =
    createFeatureSelector<ChosenProduct[]>('chosenProducts');

// Selector to get an chosen product by id.
export const selectChosenProductById = (id: string) => createSelector(
    createFeatureSelector<ChosenProduct[]>('chosenProducts'),
    (availableProducts: ChosenProduct[]) =>
        availableProducts.find(availableProduct => availableProduct.id === id)
);
