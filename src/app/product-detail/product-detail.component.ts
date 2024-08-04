/**
 * ProductDetailComponent
 * 
 * This component is responsible for displaying the details of a product. It
 * leverages Angular's component architecture, including dependency injection
 * for services like ActivatedRoute and Store from NgRx for state management.
 * The component subscribes to route parameters to fetch the 'id' of the product
 * and uses the NgRx Store to select the product details from the application's
 * state. This approach decouples the component from direct data access, instead
 * relying on the application's state management infrastructure to provide the
 * necessary data, promoting a reactive and scalable application architecture.
 * 
 * The use of CommonModule allows the component to utilize common Angular
 * directives in its template, enhancing its functionality and presentation.
 * Following the overall pattern for this app, The component is marked as 
 * standalone, indicating it can be used independently without requiring an 
 * Angular module.
 * 
 * This component is an essential part of the product browsing experience, 
 * allowing users to learn more about a product before making a purchase 
 * decision.
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AvailableProduct } from 'src/app/models/available-product.interface';
import { selectAvailableProductById } from 'src/app/state/selectors/available-product.selectors';
import { AppState } from 'src/app/state/app.state';
import { addToCart } from '../state/actions/chosen-product.actions';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule], // CommonModule is needed for the async pipe
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // an Observable that holds the state of the current product being viewed.
  // It is initialized by selecting a product by its ID from the NgRx store, which is
  // triggered in the `ngOnInit` lifecycle hook. 
  product$!: Observable<AvailableProduct | null>;

  constructor(

    // injected to access the route parameters, specifically the 'id' of the product
    private route: ActivatedRoute,

    // router is needed to redirect back to product list after product is added to cart
    private router: Router,

    // injected to interact with the NgRx Store for state management
    private store: Store<AppState>) { }

  ngOnInit(): void {
    // We have to use .snapshot because Angular's ActivatedRoute parameters (params) are Observables. 
    const productId = this.route.snapshot.params['id'];
    this.product$ = this.store.select(selectAvailableProductById(productId));
  }

  // This method is called when the user clicks the "Buy" button.
  addProduct() {
    this.product$.subscribe(product => {
      if (product) {
        const { id, productName, unitPrice } = product;

        // Dispatch the addToCart action with the desctructured properties
        this.store.dispatch(addToCart({ id, productName, unitPrice}));

        // Go back to the stuff page so the user can't accidentally click the buy button more than once.
        // This is a variation on the PRG (Post Redirect Get) design pattern.
        this.router.navigate(['/stuff']);
      }
    });
    
  }




}