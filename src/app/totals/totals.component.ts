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
import { selectTaxRate } from '../state/selectors/tax-rate.selectors';
import { map, combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {

  // @typescript-eslint/no-inferrable-types Type number trivially inferred from a number literal, remove type annotation
  subtotal! : number; // Hardcoded for testing
  tax! : number; // Hardcoded for testing
  grandTotal! : number; // Hardcoded for testing

  // Inject the NgRx store to access the application state.
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

    // Select the chosenProducts state slice from the store.
    // Thia observable will emit the chosenProducts array whenever it changes.
    const chosenProducts$ = this.store.select(selectChosenProductsState).pipe(

      // Use the map operator to transform the chosenProducts array.
      map(chosenProducts =>

        // Calculate the subtotal by reducing the chosenProducts array,
        // multiplying each product's unitPrice by its quantity and
        // accumulating the results.
        // Note: the reduce function used here has nothing to do with ngrx reducers.
        chosenProducts.reduce(
          (acc, product) => acc + (product.unitPrice * product.qty), 0)
      )
    );

    // Select the taxRate state slice from the store.
    // This observable will emit the taxRate value whenever it changes.
    const taxRate$ = this.store.select(selectTaxRate);

    // Combine the chosenProducts and taxRate$ observables using the combineLatest operator.
    // This operator will emit an array containing the latest values from both observables
    // whenever either of them changes.
    // We then subscribe to the array and calculate the tax and grandTotal based on the latest values.
    chosenProducts$.pipe(
      combineLatestWith(taxRate$)
    ).subscribe(([subtotal, taxRate]) => {
      this.subtotal = subtotal;
      this.tax = subtotal * taxRate;
      this.grandTotal = subtotal + this.tax;
    });
  
  }

}
