/**
 * tax rate Selectors Unit Tests
 * 
 * This file contains unit tests for the selectors defined in the tax-rate.selectors.ts file.
 * It tests the functionality of each selector to ensure they correctly select and return the
 * desired pieces of state from the AppState. These tests utilize the AppState 
 * model to create mock states for testing purposes.
 * 
 * The selectors tested in this file include:
 * - selectTaxRate: Tests selecting the tax rate from the AppState.
 */
import { selectTaxRate } from './tax-rate.selectors';
import { AppState } from '../app.state';

describe('TaxRateSelectors', () => {
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
    },
    taxRate: 0.05 // Initial tax rate
  };

  // Test for selecting the tax rate
  it('should select the tax rate', () => {
    // Directly invoke the selector with the initial AppState
    const result = selectTaxRate(appInitialState);

    // Expect the result to equal the tax rate in the initial AppState
    expect(result).toEqual(appInitialState.taxRate);
  });
});