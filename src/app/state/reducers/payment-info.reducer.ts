/**
 * Payment Info Reducer
 * 
 * This file contains the reducer function for managing the payment information state
 * in the application. It handles actions related to updating the payment method and 
 * card expiration date.
 * 
 * The initial state is defined based on the PaymentInfo interface, with default values 
 * set to null for both paymentMethod and cardExpiration.
 * 
 * Actions handled by this reducer include:
 * - updatePaymentMethod: Updates the payment method in the state.
 * - updateCardExpiration: Updates the card expiration date in the state.
 * 
 * The reducer function uses the createReducer utility from @ngrx/store to define the 
 * state transitions in response to the actions.
 */
import { createReducer, on } from '@ngrx/store';
import { PaymentInfo } from '../../models/payment-info.interface';
import { updatePaymentMethod, updateCardExpiration } from '../actions/payment-info.actions';
import { resetState } from '../actions/cross-state.actions';

// Define the initial state based on the PaymentInfo interface
const initialState: PaymentInfo = {
  paymentMethod: null, // Assuming null as initial state
  cardExpiration: null // Assuming null as initial state
};

// Reducer function for payment information
export const paymentInfoReducer = createReducer(
  initialState,

  // Handle the updatePaymentMethod action
  on(updatePaymentMethod, (state, { paymentMethod }) => ({
    ...state,
    paymentMethod: paymentMethod
  })),

  // Handle the updateCardExpiration action
  on(updateCardExpiration, (state, { cardExpiration }) => ({
    ...state,
    cardExpiration: cardExpiration
  })), 

  // Handle the resetState action
  on(resetState, () => { return initialState; }), 

);