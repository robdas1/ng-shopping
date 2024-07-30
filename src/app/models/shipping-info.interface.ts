/**
 * ShippingInfo Interface
 * 
 * This interface defines the structure for shipping information, including the
 * customer's name and address.
 */

export interface ShippingInfo {
    // Customer's name, can be null if not provided
    customerName: string | null;
  
    // Customer's address, can be null if not provided
    customerAddress: string | null;
  }