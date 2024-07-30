
/**
 * Payment Info Selectors
 * 
 * This file contains the selectors for the paymentInfo state slice.  
 * 
 * The property name paymentInfo is used to configure NGRX state in the 
 * StoreModule.forRoot() method, in the src/main.ts file. This property name is
 * used in the AppState interface definition, found in the src/app/state/app.state.ts
 */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

// Selector to get the paymentInfo slice of the AppState.
export const selectPaymentInfo = (state: AppState) => state.paymentInfo;

// Selector to get the payment method.
export const selectPaymentMethod = createSelector(
  selectPaymentInfo,
  (paymentInfo) => paymentInfo.paymentMethod
);

// Selector to get the card expiration.
export const selectCardExpiration = createSelector(
  selectPaymentInfo,
  (paymentInfo) => paymentInfo.cardExpiration
);