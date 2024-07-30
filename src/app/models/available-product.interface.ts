/**
 * Available Product Interface
 * 
 * This interface defines the structure of an available product object.
 * It includes properties for the available product's id, name, details, image source, download date, image file, and unit price.
 */
export interface AvailableProduct {
    // The id of the available product.
    id: string;
  
    // The name of the available product.
    productName: string;
  
    // The details of the available product.
    productDetails: string;
  
    // The source URL of the available product's image.
    productImageSource: string;
  
    // The download date of the available product's image.
    downloadDate: string;
  
    // The file name of the available product's image.
    productImageFile: string;
  
    // The unit price of the available product.
    unitPrice: number;
  }