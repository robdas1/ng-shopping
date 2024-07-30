/**
 * Shipping Info Selectors
 * 
 * This file contains the selectors for the shippingInfo state slice. 
 * 
 * The property name shippingInfo is used to configure NGRX state in the 
 * StoreModule.forRoot() method, in the src/main.ts file. This property name is
 * used in the AppState interface definition, found in the src/app/state/app.state.ts
 */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

// Selector to get the shippingInfo slice of the AppState.
export const selectShippingInfo = (state: AppState) => state.shippingInfo;

// Selector to get the customer name.
export const selectCustomerName = createSelector(
    selectShippingInfo,
    (shippingInfo) => shippingInfo.customerName
);

// Selector to get the customer address.
export const selectCustomerAddress = createSelector(
    selectShippingInfo,
    (shippingInfo) => shippingInfo.customerAddress
);