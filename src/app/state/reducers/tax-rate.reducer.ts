/**
 * tax rate reducer
 * 
 * This file defines the reducer for tax rate. The reducer's on() functions
 * return a new state object that represents the updated state of the available products
 * based on the dispatched action and its payload.
 */
import { createReducer, on } from '@ngrx/store';
import { resetState } from '../actions/cross-state.actions';

// Define the initial state for taxRate
const initialState = 0.05; // 5%

// Reducer function for taxRate
export const taxRateReducer = createReducer(
  initialState, 
  on(resetState, () => initialState)
);