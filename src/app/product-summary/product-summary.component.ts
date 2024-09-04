/**
 * product-summary.component.ts
 * 
 * This file defines the ProductSummaryComponent, which is responsible for displaying a summary of a 
 * single product. The component is designed to be used as a standalone component, meaning it does not 
 * require an NgModule. It imports CommonModule and RouterModule to utilize common Angular directives 
 * and routing functionalities. The component receives an AvailableProduct object as an input and 
 * displays its details in a template.
 */

import { Component, Input } from '@angular/core';
import { AvailableProduct } from '../models/available-product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// @Component decorator defines the metadata for the component
@Component({
  selector: 'app-product-summary', // The CSS selector that identifies this component in a template
  standalone: true, // Indicates that this component is standalone and does not require an NgModule
  imports: [CommonModule, RouterModule], // Modules to import for this component
  templateUrl: './product-summary.component.html', // Path to the component's HTML template
  styleUrls: ['./product-summary.component.css'] // Path to the component's CSS styles
})
export class ProductSummaryComponent {
  // @Input decorator marks this property as an input property, which means it can receive data from 
  // a parent component
  @Input() product!: AvailableProduct; // The product to be displayed, of type AvailableProduct
}