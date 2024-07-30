/**
 * Payment Info Actions
 * 
 * This file defines the actions related to the payment info in the application state.
 */
import { createAction, props } from "@ngrx/store";

// Action dispatched when the payment method is updated.
export const updatePaymentMethod = createAction(
  '[Payment Info] Update Payment Method',
  props<{ paymentMethod: "credit card" | "pay pal" | "my pay" | null }>()
);

// Action dispatched when the card expiration is updated.
export const updateCardExpiration = createAction(
  '[Payment Info] Update Card Expiration',
  props<{ cardExpiration: Date }>()
);