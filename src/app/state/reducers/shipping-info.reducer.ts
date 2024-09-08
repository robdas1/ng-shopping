/**
 * Shipping Info Reducer
 * 
 * This file contains the reducer function for managing the shipping information state
 * in the application. It handles actions related to updating the customer's name and 
 * address.
 * 
 * The initial state is defined based on the ShippingInfo interface, with default values 
 * set to null for both customerName and customerAddress.
 * 
 * Actions handled by this reducer include:
 * - updateCustomerName: Updates the customer's name in the state.
 * - updateCustomerAddress: Updates the customer's address in the state.
 * 
 * The reducer function uses the createReducer utility from @ngrx/store to define the 
 * state transitions in response to the actions.
 */

import { createReducer, on } from '@ngrx/store';
import { ShippingInfo } from '../../models/shipping-info.interface';
import { updateCustomerName, updateCustomerAddress } from '../actions/shipping-info.actions';
import { resetState } from '../actions/cross-state.actions';

// Define the initial state based on the ShippingInfo interface
const initialState: ShippingInfo = {
    customerName: null, // Assuming null as initial state
    customerAddress: null // Assuming null as initial state
};

// Reducer function for shipping information
export const shippingInfoReducer = createReducer(
    initialState,

    // Handle the updateCustomerName action
    on(updateCustomerName, (state, { customerName }) => ({
        ...state,
        customerName: customerName
    })),

    // Handle the updateCustomerAddress action
    on(updateCustomerAddress, (state, { customerAddress }) => ({
        ...state,
        customerAddress: customerAddress
    })),

    // Handle the resetState action
    on(resetState, () => { return initialState; }),

);