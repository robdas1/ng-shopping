import { createReducer, on } from '@ngrx/store';
import { PaymentInfo } from '../../models/payment-info.interface';
import { updatePaymentMethod, updateCardExpiration } from '../actions/payment-info.actions';

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
  }))
);