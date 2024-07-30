import { createReducer, on } from '@ngrx/store';
import { ShippingInfo } from '../../models/shipping-info.interface';
import { updateCustomerName, updateCustomerAddress } from '../actions/shipping-info.actions';

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
    }))
);