/**
 * Chosen Product Actions
 * 
 * This file defines the actions related to the chosen products in the application state.
 */
import { createAction, props } from '@ngrx/store';

// Action dispatched when a chosen product item is removed from the chosen products array.
export const removeChosenProduct = createAction(
  '[Chosen Products] Remove Chosen Product',
  props<{ productId: string }>()
);

// Action dispatched when an item is added to the chosen products array.
export const addToCart = createAction(
  '[Chosen Products] Add To Cart',
  props<{ id: string; productName: string; unitPrice: number }>()
);
