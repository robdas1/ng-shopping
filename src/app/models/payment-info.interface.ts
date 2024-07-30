/**
 * PaymentInfo Interface
 * 
 * This interface defines the structure for payment information, including the
 * payment method and card expiration date.
 */

export interface PaymentInfo {
    // Allow null or specific string values for paymentMethod
    paymentMethod: "credit card" | "pay pal" | "my pay" | null;
  
    // Allow null or Date for cardExpiration
    cardExpiration: Date | null;
  }