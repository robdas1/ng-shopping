/**
 * Available Product Actions
 * 
 * This file defines the actions related to available products.
 */
import { createAction, props } from '@ngrx/store';
import { AvailableProduct } from '../../models/available-product.interface';

// Action to load the available products.
export const loadAvailableProducts = createAction(
  '[AvailableProduct] Load Available Products'
);

// Action dispatched when the available products are loaded successfully.
export const loadAvailableProductsSuccess = createAction(
  '[AvailableProduct] Load Available Products Success',
  props<{ availableProducts: AvailableProduct[] }>()
);

// Action dispatched when there is an error loading the available products.
export const loadAvailableProductsFailure = createAction(
  '[AvailableProduct] Load Available Products Failure',
  props<{ error: unknown }>()
);