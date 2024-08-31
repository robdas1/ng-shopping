import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChosenProduct } from '../models/chosen-product.interface';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';

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
  totalItems: number = 0; // the total number of items in the cart

  constructor(private store: Store) {
    // The constructor injects the NgRx Store for state management.
  }

  ngOnInit(): void {
    // On component initialization, select the available products state from the store.
    console.debug('CartSummaryComponent ngOnInit...');
    this.chosenProducts$ = this.store.select(selectChosenProductsState);
    this.chosenProducts$.subscribe(products => {
      this.totalItems = products.reduce((sum, product) => sum + product.qty, 0);
  });
}

}