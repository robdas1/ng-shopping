/**
 * Shipping Info Selectors Unit Tests
 * 
 * This file contains unit tests for the selectors defined in the shipping-info.selectors.ts file.
 * It tests the functionality of each selector to ensure they correctly select and return the
 * desired pieces of state from the AppState. These tests utilize the AppState and ShippingInfo
 * models to create mock states for testing purposes.
 * 
 * The selectors tested in this file include:
 * - selectShippingInfo: Tests selecting the entire shippingInfo object from the AppState.
 * - selectCustomerName: Tests selecting the customer name from the shippingInfo state slice.
 * - selectCustomerAddress: Tests selecting the customer address from the shippingInfo state slice.
 */
import { ShippingInfo } from "src/app/models/shipping-info.interface";
import { AppState } from "../app.state";
import { selectCustomerAddress, selectCustomerName, selectShippingInfo } from "./shipping-info.selectors";

describe('ShippingInfoSelectors', () => {

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

  const shippingInfoInitialState: ShippingInfo = {
    customerName: 'John Doe',
    customerAddress: '123 Main St, Anytown, USA'
  };

  // Test for selecting the entire shippingInfo object
  it('should select the shippingInfo object', () => {

    // Directly invoke the selector with the initial AppState
    const result = selectShippingInfo(appInitialState);

    // Expect the result to equal the shippingInfo object in the initial AppState
    expect(result).toEqual(appInitialState.shippingInfo);
  });

  // Test for selecting the customer name
  it('should select the customer name', () => {

    // Use the .projector() method to directly invoke the selector with the initial state
    const result = selectCustomerName.projector(shippingInfoInitialState);

    // Expect the result to equal the customer name in the initial state
    expect(result).toEqual('John Doe');
  });

  // Test for selecting the customer address
  it('should select the customer address', () => {

    // Use the .projector() method to directly invoke the selector with the initial state
    const result = selectCustomerAddress.projector(shippingInfoInitialState);
    
    // Expect the result to equal the customer address in the initial state
    expect(result).toEqual('123 Main St, Anytown, USA');
  });
});