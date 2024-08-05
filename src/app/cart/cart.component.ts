/**
 * cart.component.ts
 * 
 * This component represents the cart view of the application. It allows users
 * to view chosen products and interact with them.
 */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChosenProduct } from '../models/chosen-product.interface';
import { addToCart, removeChosenProduct } from '../state/actions/chosen-product.actions';
import { AppState } from '../state/app.state';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { CommonModule } from '@angular/common';
import { TotalsComponent } from '../totals/totals.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [

  // FormsModule is imported to enable template-driven forms functionality,
  // allowing us to bind input fields in the template to component properties
  // and handle form submission.
    FormsModule,

    // CommonModule is imported to use common directives like ngIf and ngFor
    // in the template, which are essential for conditional rendering and
    // iterating over lists.
    CommonModule,

    // TotalsComponent is imported to include the totals section directly
    // within the cart component's template. This allows us to display the
    // subtotal, tax, and total amounts calculated from the cart's contents.
    TotalsComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  // Observable to hold the chosen products
  chosenProducts$!: Observable<ChosenProduct[]>;

  // This flag is used in the cart component template to conditionally display the 
  // cart table. When there are no products in the cart (i.e., the cart is empty), 
  // this flag is set to false, causing the cart table to be hidden. Conversely, 
  // when there are products in the cart, this flag is set to true, and the cart 
  //  table is displayed using Angular's template binding and the ngIf directive
  // in the template.
  isDataInIt: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    // Subscribe to the chosenProducts$ Observable to get the current state 
    // of chosen products in the cart. This subscription is necessary to 
    // dynamically update the cart view whenever the chosen products change.
    this.chosenProducts$ = this.store.select(selectChosenProductsState);

    // The subscription callback updates the isDataInIt flag based on the presence 
    // of products. This flag is used to conditionally display the cart table in 
    // the template.
    this.chosenProducts$.subscribe(products => {

      // Set isDataInIt to true if there are products in the cart, otherwise false.
      // This helps in dynamically showing or hiding the cart table based on the 
      // cart's content.
      this.isDataInIt = products.length > 0;
    });
  }

  // Function to add a product to the state
  addProduct(id: string, productName: string, unitPrice: number) {

    // Dispatch the addToCart action with the test product
    this.store.dispatch(addToCart({ id, productName, unitPrice }));
  }

  // Function to remove a product from state.
  removeProduct(id: string): void {
    this.store.dispatch(removeChosenProduct({ productId: id })); // Use testProductId directly
  }

}
