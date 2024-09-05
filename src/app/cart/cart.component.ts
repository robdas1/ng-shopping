/**
 * cart.component.ts
 * 
 * This component represents the cart view of the application. It allows users
 * to view chosen products and interact with them.
 */
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChosenProduct } from '../models/chosen-product.interface';
import { addToCart, removeChosenProduct } from '../state/actions/chosen-product.actions';
import { AppState } from '../state/app.state';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { CommonModule } from '@angular/common';
import { TotalsComponent } from '../totals/totals.component';
import { ActivatedRoute, Resolve, ResolveFn } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';

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
    TotalsComponent,

    RouterLink, ModalConfirmationComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  // @ViewChild(ModalNotificationComponent) modalComponent!: ModalNotificationComponent;
  @ViewChild(ModalConfirmationComponent) modalComponent!: ModalConfirmationComponent;


  // Observable to hold the chosen products
  chosenProducts$!: Observable<ChosenProduct[]>;

  // This flag is used in the cart component template to conditionally display the 
  // cart table. When there are no products in the cart (i.e., the cart is empty), 
  // this flag is set to false, causing the cart table to be hidden. Conversely, 
  // when there are products in the cart, this flag is set to true, and the cart 
  //  table is displayed using Angular's template binding and the ngIf directive
  // in the template.
  isDataInIt = false; // @typescript-eslint/no-inferrable-types Type boolean trivially inferred from a boolean literal, remove type annotation

  title: string | Type<Resolve<string>> | ResolveFn<string> | undefined; // data type returned by route.snapshot.routeConfig?.title

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { 
    this.title = this.route.snapshot.routeConfig?.title;
  }

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
    this.store.dispatch(removeChosenProduct({ productId: id })); 
  }

    // Placeholder function to handle the restart button click
  onRestart(): void {
    console.debug('CartComponent.onRestart()');
    this.modalComponent.openModalConfirmation('Are you sure you want to restart?');
  }

}
