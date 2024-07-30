/**
 * chosenProductReducer Unit Tests
 *
 * This file contains unit tests for the chosenProductReducer function,
 * which manages the state of chosen products in the application. The tests
 * cover various scenarios for adding and removing products, ensuring that
 * the reducer behaves as expected.
 */

import { chosenProductReducer } from './chosen-product.reducer';
import { addToCart, removeChosenProduct } from '../actions/chosen-product.actions';
import { ChosenProduct } from '../../models/chosen-product.interface';

describe('chosenProductReducer', () => {

  // Test for adding a new product that does not exist in the state
  it('should add a new product if it does not exist in the state', () => {

    // Arrange
    const initialState: ChosenProduct[] = [];
    const action = addToCart({ 
      id: '01',
      productName: 'Test Product',
      unitPrice: 100.00,
    });

    // Act
    const state = chosenProductReducer(initialState, action);
    
    // Assert
    // Verifying the new product is added with qty = 1
    expect(state.length).toBe(1);
    expect(state[0].id).toBe('01');
    expect(state[0].qty).toBe(1);
  });

  // Test for increasing the quantity of an existing product in the state
  it('should increase the quantity of an existing product in the state', () => {

    // Arrange
    const initialStateWithProduct: ChosenProduct[] = [
      {
        id: '01',
        productName: 'Test Product',
        unitPrice: 100.00,
        qty: 1
      }
    ];
    const action = addToCart({ 
      id: '01',
      productName: 'Test Product',
      unitPrice: 100.00,
    });

    // Act
    const state = chosenProductReducer(initialStateWithProduct, action);
    
    // Assert
    // Verifying the quantity is incremented by 1
    expect(state.length).toBe(1);
    expect(state[0].id).toBe('01');
    expect(state[0].qty).toBe(2);
  });

  // Test for adding a new product when multiple products exist in the state
  it('should handle adding a new product when multiple products exist in the state', () => {

    // Arrange
    const initialStateWithMultipleProducts: ChosenProduct[] = [
      {
        id: '01',
        productName: 'First Product',
        unitPrice: 50.00,
        qty: 1
      },
      {
        id: '02',
        productName: 'Second Product',
        unitPrice: 150.00,
        qty: 2
      }
    ];
    const newProduct: ChosenProduct = {
      id: '03',
      productName: 'New Product',
      unitPrice: 100.00,
      qty: 0
    };

    console.debug('unit test, initialStateWithMultipleProducts:', initialStateWithMultipleProducts);
    console.debug('unit test, existingProduct:', newProduct);
    
    const action = addToCart({ 
      id: newProduct.id, 
      productName: newProduct.productName, 
      unitPrice: newProduct.unitPrice 
    });

    // Act
    const state = chosenProductReducer(initialStateWithMultipleProducts, action);
    
    console.debug('unit test, state from chosenProductReducer:', state);
    
    // Assert
    expect(state.length).toBe(3);
    const addedProduct = state.find(p => p.id === newProduct.id);
    expect(addedProduct).toBeDefined();

    console.debug('unit test, updatedProduct:',addedProduct);

    if (addedProduct) {

      // Verifying the new product is added with qty = 1
      expect(addedProduct.qty).toBe(1);
    }
  });

  // Test for incrementing the quantity of an existing product among multiple products in the state
  it('should handle incrementing the quantity of an existing product among multiple products in the state', () => {

    // Arrange
    const initialStateWithMultipleProducts: ChosenProduct[] = [
      {
        id: '01',
        productName: 'First Product',
        unitPrice: 50.00,
        qty: 1
      },
      {
        id: '02',
        productName: 'Second Product',
        unitPrice: 150.00,
        qty: 2
      }
    ];
    const existingProduct: ChosenProduct = {
      id: '02',
      productName: 'Second Product',
      unitPrice: 150.00,
      qty: 0
    };
    const action = addToCart({ 
      id: existingProduct.id, 
      productName: existingProduct.productName, 
      unitPrice: existingProduct.unitPrice 
    });

    // Act
    const state = chosenProductReducer(initialStateWithMultipleProducts, action);

    // Assert

    expect(state.length).toBe(2);
    const updatedProduct = state.find(p => p.id === existingProduct.id);
    expect(updatedProduct).toBeDefined();
    if (updatedProduct) {

      // Verifying the quantity is incremented by 1
      expect(updatedProduct.qty).toBe(3);
    }
  });

  // Test for ensuring state does not change with an unrelated action
  it('should not change the state when a different action is dispatched', () => {

    const initialState: ChosenProduct[] = [];
    const differentAction = { type: 'Different Action' };
    const state = chosenProductReducer(initialState, differentAction);
    
    // Verifying the state remains unchanged
    expect(state).toBe(initialState);
  });

  /**
   * This test verifies that when addToCart action is dispatched with
   * a ChosenProduct object that has an ID not present in the initial state,
   * the reducer correctly adds the new product to the state array. It checks
   * that the state length increases by one, the existing product remains
   * unchanged, the new product with the specified ID is added with a quantity
   * of 1, and other properties are correctly initialized from the action payload.
   */
  it('should add a new product when addToCart is dispatched with a non-existing product ID', () => {
    // Arrange
    const initialStateWithProduct: ChosenProduct[] = [
      {
        id: '01',
        productName: 'Test Product',
        unitPrice: 100.00,
        qty: 1
      }
    ];
    const chosenProduct: ChosenProduct = {
      id: '02',
      productName: 'Another Test Product',
      unitPrice: 150.00,
      qty: 0
    };

    // Act
    const action = addToCart({ 
      id:chosenProduct.id, 
      productName:chosenProduct.productName, 
      unitPrice:chosenProduct.unitPrice 
    });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state.length).toBe(2);            // Verifying the state length increases by one
    expect(state[0].id).toBe('01');          // Verifying the existing product remains unchanged
    expect(state[1].id).toBe('02');          // Verifying the new product is added with the specified ID
    expect(state[1].qty).toBe(1);            // Verifying the new product has a quantity of 1
  });


  /**
   * This test verifies that when removeChosenProduct action is dispatched
   * with a product ID that exists in the initial state, the reducer correctly
   * decreases the quantity of that product by 1. It checks that the state
   * length remains consistent after removal, and the quantity of the specified
   * product is reduced by 1.
   */
  it('should decrease the quantity of an existing product when removeChosenProduct is dispatched', () => {
    // Arrange
    const initialStateWithProduct: ChosenProduct[] = [
      {
        id: '01',
        productName: 'Test Product',
        unitPrice: 100.00,
        qty: 2
      }
    ];

    // Act
    const action = removeChosenProduct({ productId: '01' });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state.length).toBe(1);    // Verifying the state length remains consistent
    expect(state[0].qty).toBe(1);    // Verifying the quantity of the product is decreased by 1
  });

  /**
   * This test verifies that when removeChosenProduct action is dispatched
   * with a product ID that exists in the initial state and its quantity is reduced
   * to zero, the reducer correctly removes the product from the state. It checks
   * that the state length becomes zero after the product removal.
   */
  it('should remove the product from the state when removeChosenProduct is dispatched and quantity is zero', () => {
    // Arrange
    const initialStateWithProduct: ChosenProduct[] = [
      {
        id: '01',
        productName: 'Test Product',
        unitPrice: 100.00,
        qty: 1
      }
    ];

    // Act
    const action = removeChosenProduct({ productId: '01' });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state.length).toBe(0);    // Verifying the product is removed from the state
  });

  /**
   * This test verifies that when removeChosenProduct action is dispatched with
   * a product ID that does not exist in the initial state, the reducer does not
   * modify the state and returns it unchanged. It checks that the state remains
   * the same as the initial state provided.
   */
  it('should not change the state when removeChosenProduct is dispatched for a non-existing product', () => {
    // Arrange
    const initialStateWithProduct: ChosenProduct[] = [
      {
        id: '01',
        productName: 'Test Product',
        unitPrice: 100.00,
        qty: 1
      }
    ];

    // Act
    const action = removeChosenProduct({ productId: '02' });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state).toBe(initialStateWithProduct);    // Verifying the state remains unchanged
  });


  /**
   * This test verifies that when removeChosenProduct action is dispatched with
   * a product ID that is different from the existing product IDs in the initial state,
   * the reducer does not modify the state and returns it unchanged. It checks that
   * the state remains the same as the initial state provided.
   */
  it('should not change the state when removeChosenProduct is dispatched for a different product ID', () => {
    // Arrange
    const initialStateWithProduct: ChosenProduct[] = [
      {
        id: '01',
        productName: 'Test Product',
        unitPrice: 100.00,
        qty: 1
      }
    ];

    // Act
    const action = removeChosenProduct({ productId: '02' });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state.length).toBe(1);      // Verifying the state length remains unchanged
    expect(state[0].id).toBe('01');    // Verifying the ID of the product remains unchanged
    expect(state[0].qty).toBe(1);      // Verifying the quantity of the product remains unchanged
  });

  /**
   * This test verifies that when removeChosenProduct action is dispatched
   * with a product ID that exists in the initial state, the reducer decreases
   * the quantity of that product by 1. It checks that after the action is
   * processed, the state contains the product with its quantity decremented
   * by 1.
   */
  it('should decrement the quantity when product exists', () => {
    // Arrange
    const existingProduct: ChosenProduct = { 
      id: '01', 
      productName: 'Test Product', 
      unitPrice: 100, 
      qty: 2 
    };
    const initialStateWithProduct: ChosenProduct[] = [existingProduct];

    // Act
    const action = removeChosenProduct({ productId: '01' });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state.length).toBe(1);        // Verifying the state length remains unchanged
    expect(state[0].qty).toBe(1);        // Verifying the quantity of the product is decremented by 1
  });

  /**
   * This test verifies that when removeChosenProduct action is dispatched
   * for a product ID that exists in the initial state with quantity 1, the reducer
   * correctly removes the product from the state. It checks that after processing
   * the action, the state is empty, indicating the product has been completely removed.
   */
  it('should remove the product when quantity goes to zero', () => {
    // Arrange
    const existingProduct: ChosenProduct = { 
      id: '01', 
      productName: 'Test Product', 
      unitPrice: 100, 
      qty: 1 
    };
    const initialStateWithProduct: ChosenProduct[] = [existingProduct];

    // Act
    const action = removeChosenProduct({ productId: '01' });
    const state = chosenProductReducer(initialStateWithProduct, action);

    // Assert
    expect(state.length).toBe(0);  // Verifying the state is empty after removing the product
  });

});
