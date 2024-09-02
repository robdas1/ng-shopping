/**
 * CartSummaryComponent
 * 
 * This file defines the CartSummaryComponent which is responsible for displaying a summary of the 
 * products in the user's cart. It shows the total number of items in the cart and provides a button 
 * to view the cart details. The component uses NgRx Store for state management to select the chosen 
 * products from the store and calculate the total number of items.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChosenProduct } from '../models/chosen-product.interface';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent implements OnInit {
  // Holds the list of products as an Observable stream.
  chosenProducts$!: Observable<ChosenProduct[]>; // note the use of the definite assignment assertion operator (!)
  totalItems = 0; // the total number of items in the cart

  constructor(private store: Store, private router: Router) {
    // Inject the NgRx Store for state management and Router for navigation
  }

  ngOnInit(): void {
    // On component initialization, select the available products state from the store.
    console.debug('CartSummaryComponent ngOnInit...');
    this.chosenProducts$ = this.store.select(selectChosenProductsState);
    this.chosenProducts$.subscribe(products => {
      this.totalItems = products.reduce((sum, product) => sum + product.qty, 0);
    });
  }

  // Method to navigate to the cart page
  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

}