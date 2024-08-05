/**
 *  TotalsComponent
 * 
 * This file defines the TotalsComponent which is responsible for displaying
 * the subtotal, tax, and grand total of chosen products in the application.
 * It utilizes NgRx store to select and calculate the total amounts based on
 * the chosen products' state.
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {
  // Initialize subtotal, tax, and grandTotal with default values.
  subtotal: number = 0; // Hardcoded for testing
  tax: number = 1; // Hardcoded for testing
  grandTotal: number = 1; // Hardcoded for testing

  // Inject the NgRx store to access the application state.
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Select the chosenProducts state slice from the store.
    // Thia observable will emit the chosenProducts array whenever it changes.
    this.store.select(selectChosenProductsState)
      .pipe(
        // Use the map operator to transform the chosenProducts array.
        map(chosenProducts => 
          // Calculate the subtotal by reducing the chosenProducts array,
          // multiplying each product's unitPrice by its quantity and
          // accumulating the results.
          // Note: the reduce function used here has nothing to do with ngrx reducers.
          chosenProducts.reduce(
            (acc, product) => acc + (product.unitPrice * product.qty), 0)
        )
      )
      // Subscribe to the observable to receive the calculated subtotal.
      // Update the component's subtotal property with the received value.
      .subscribe(subtotal => this.subtotal = subtotal);
  }

}
