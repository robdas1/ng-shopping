/**
 * ProductListComponent
 * 
 * This component is responsible for displaying a list of available products within the application.
 * The component interacts with the application's state management system (NgRx Store) to select and display
 * the list of available products. It demonstrates the use of Angular's reactive programming model by subscribing
 * to an Observable stream of product data.
 */

import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AvailableProduct } from 'src/app/models/available-product.interface';
import { selectAvailableProductsState } from 'src/app/state/selectors/available-product.selectors';
import { Store } from '@ngrx/store';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { ActivatedRoute, Resolve, ResolveFn } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true, // Enables standalone usage, no NgModule required
  imports: [CommonModule, ProductSummaryComponent],  
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Holds the list of products as an Observable stream.
  products$!: Observable<AvailableProduct[]>; // note the use of the definite assignment assertion operator (!)
  title: string | Type<Resolve<string>> | ResolveFn<string> | undefined; // data type returned by route.snapshot.routeConfig?.title

  constructor(private store: Store, private route: ActivatedRoute) {
    this.title = this.route.snapshot.routeConfig?.title;
  }

  ngOnInit(): void {
    // On component initialization, select the available products state from the store.
    this.products$ = this.store.select(selectAvailableProductsState);
  }

}