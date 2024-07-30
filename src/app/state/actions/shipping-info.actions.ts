/**
 * Shipping Info Actions
 * 
 * This file defines the actions related to the shipping info in the application state.
 */
import { createAction, props } from '@ngrx/store';

// Action dispatched when the customer's name is updated.
export const updateCustomerName = createAction(
  '[Shipping Info] Update Customer Name',
  props<{ customerName: string | null }>()
);

// Action dispatched when the customer's address is updated.
export const updateCustomerAddress = createAction(
  '[Shipping Info] Update Customer Address',
  props<{ customerAddress: string | null }>()
);