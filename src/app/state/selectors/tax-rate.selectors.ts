/**
 * tax rate Selectors
 * 
 * This file contains the selectors for the tax rate state slice. 
 * 
 * The property name taxRate is used to configure NGRX state in the 
 * StoreModule.forRoot() method, in the src/main.ts file. This property name is
 * used in the AppState interface definition, found in the src/app/state/app.state.ts
 */
import { AppState } from '../app.state';

// Selector to get the taxRate from the AppState
export const selectTaxRate = (state: AppState) => state.taxRate;