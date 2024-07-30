/**
 * Chosen Product Selectors Spec
 * 
 * This file contains the unit tests for the chosen product selectors. It is designed to test the
 * selector's ability to accurately retrieve specific chosen products from the state based on their ID.
 * These tests ensure that the selectors are correctly implemented and can handle various scenarios,
 * such as selecting existing products by ID and handling cases where a product ID does not exist.
 */
import { ChosenProduct } from 'src/app/models/chosen-product.interface';
import { selectChosenProductById } from './chosen-product.selectors';

describe('ChosenProductSelectors', () => {

  // Define the initial state to be used in tests
  const initialState: ChosenProduct[] = [
    {
      id: '01',
      productName: 'Test Product',
      unitPrice: 100.00,
      qty: 1
    },
    {
      id: '02',
      productName: 'Another Test Product',
      unitPrice: 150.00,
      qty: 2
    }
  ];

  // Test for selecting a chosen product by its ID
  it('should select a chosen product by id', () => {

    // Use the .projector() method to directly invoke the selector with the initial state and an ID
    const result = selectChosenProductById('01').projector(initialState);

    // Expect the result to equal the first product in the initial state array
    expect(result).toEqual(initialState[0]);
  });

  // Test for verifying behavior when the product ID does not exist
  it('should return undefined when the product ID does not exist', () => {
    
    // Invoke the selector with a non-existing ID
    const result = selectChosenProductById('03').projector(initialState);

    // Expect the result to be undefined since there is no product with ID '03'
    expect(result).toBeUndefined();
  });
});