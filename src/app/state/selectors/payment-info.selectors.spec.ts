/**
 * Payment Info Selectors Unit Tests
 * 
 * This file contains unit tests for the selectors defined in the payment-info.selectors.ts file.
 * It tests the functionality of each selector to ensure they correctly select and return the
 * desired pieces of state from the AppState. These tests utilize the AppState and PaymentInfo
 * models to create mock states for testing purposes.
 * 
 * The selectors tested in this file include:
 * - selectPaymentInfo: Tests selecting the entire paymentInfo object from the AppState.
 * - selectPaymentMethod: Tests selecting the payment method from the paymentInfo state slice.
 * - selectCardExpiration: Tests selecting the card expiration date from the paymentInfo state slice.
 */
import { selectPaymentMethod, selectCardExpiration, selectPaymentInfo } from './payment-info.selectors';
import { PaymentInfo } from '../../models/payment-info.interface';
import { AppState } from '../app.state';

describe('PaymentInfoSelectors', () => {

  // Define the initial state to be used in tests
const appInitialState: AppState = {
    chosenProducts: [],
    availableProducts: [],
    paymentInfo: {
      paymentMethod: null,
      cardExpiration: null
    },
    shippingInfo: {
      customerName: null,
      customerAddress: null
    }
  };

  const paymentInfoInitialState: PaymentInfo = {
  paymentMethod: 'credit card',
  cardExpiration: new Date('2023-12-01')
  };
  
  // Test for selecting the entire paymentInfo object
  it('should select the paymentInfo object', () => {

    // Directly invoke the selector with the initial AppState
    const result = selectPaymentInfo(appInitialState);
    // Expect the result to equal the paymentInfo object in the initial AppState
    expect(result).toEqual(appInitialState.paymentInfo);
  });

  // Test for selecting the payment method
  it('should select the payment method', () => {

  // Use the .projector() method to directly invoke the selector with the initial state
  const result = selectPaymentMethod.projector(paymentInfoInitialState);

  // Expect the result to equal the payment method in the initial state
  expect(result).toEqual('credit card');
  });

  // Test for selecting the card expiration
  it('should select the card expiration', () => {

  // Use the .projector() method to directly invoke the selector with the initial state
  const result = selectCardExpiration.projector(paymentInfoInitialState);

  // Expect the result to equal the card expiration in the initial state
  expect(result).toEqual(new Date('2023-12-01'));
  });

});