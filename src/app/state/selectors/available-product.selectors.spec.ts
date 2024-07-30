/**
 * AvailableProductSelectors Tests 
 * 
 * This file contains the test suite for selectors related to the available products within the application's state.
 * The purpose of these tests is to ensure that the selectors accurately retrieve and manipulate data from the state,
 * facilitating the retrieval of available product information for components and services throughout the application.
 * 
 * The component being tested, AvailableProductSelectors, provides a set of functions designed to select specific
 * pieces of state from the Redux store. These selectors are crucial for accessing available product data, such as
 * product details, prices, and availability, in a decoupled and maintainable manner. By testing these selectors,
 * we ensure the reliability and integrity of the application's state management concerning available products.
 *
 * While testing selectors, it's important to understand their relationship with reducers and the 
 * overall state configuration. Selectors are designed to be decoupled from reducers, allowing 
 * them to retrieve state information without being directly involved in how that state is updated 
 * or managed. 
 */
import { selectAvailableProductById } from './available-product.selectors';
import { AvailableProduct } from 'src/app/models/available-product.interface';

// Tests related to AvailableProduct selectors.
describe('AvailableProduct Selectors', () => {

  // Define the initial state used in the tests, typed according to the AvailableProduct 
  // interface array. This state mimics a slice of the store's state specific to 
  // available products.
  const initialState: { availableProducts: AvailableProduct[] } = { availableProducts: [
      {
        id: '1', productName: 'Product 1', productDetails: 'Details 1', productImageSource: 'Source 1',
        downloadDate: 'Date 1', productImageFile: 'File 1', unitPrice: 100
      },
      {
        id: '2', productName: 'Product 2', productDetails: 'Details 2', productImageSource: 'Source 2',
        downloadDate: 'Date 2', productImageFile: 'File 2', unitPrice: 200
      },
    ]
  };

  // The `.projector()` function is a  method provided by NgRx for testing selectors without needing 
  // to create an actual store. It directly invokes the selector with the provided state, allowing us
  // to test the selector's logic in isolation. 

  // This test verifies the functionality of selecting an available product by its ID.
  it('should select an available product by id', () => {
    const result = selectAvailableProductById('1').projector(initialState['availableProducts']);
    expect(result).toEqual(initialState['availableProducts'][0]);
  });


  // This test verifies the behavior when selecting an available product that does not exist.
  it('should return null when the product ID does not exist', () => {
    const result = selectAvailableProductById('3').projector(initialState['availableProducts']);
    expect(result).toBeNull();
  });


});