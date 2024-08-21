
/**
 * AppComponent
 * 
 * This is the root component of the application, responsible for initializing the
 * application and orchestrating the primary layout components such as the header,
 * main layout, and footer. It also initializes the application state by dispatching
 * an action to load available products. The AppComponent integrates with Angular Router 
 * for navigation and NgRx Store for state management, showcasing a modern Angular
 * architecture.
 */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; // NgRx Store for state management

import { AppState } from './state/app.state';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { loadAvailableProducts } from './state/actions/available-product.actions';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ToastsComponent } from './toasts/toasts.component';
import { ToastsService } from './services/toasts.service';

import { Observable } from 'rxjs';
import { ChosenProduct } from './models/chosen-product.interface';
import { selectChosenProductsState } from './state/selectors/chosen-product.selectors';

import { map, combineLatestWith } from 'rxjs/operators';
import { selectTaxRate } from './state/selectors/tax-rate.selectors';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, 
    MainLayoutComponent, 
    FooterComponent,
    ToastsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chosenProducts$!: Observable<ChosenProduct[]>;
  grandTotal$!: Observable<number>;

  // Constructor injects the NgRx Store for state management
  constructor(private store: Store<AppState>, private toastsService: ToastsService) {}

  ngOnInit(): void {
    console.debug('AppComponent: initializing...');
    this.chosenProducts$ = this.store.select(selectChosenProductsState);

    this.grandTotal$ = this.chosenProducts$.pipe(
      combineLatestWith(this.store.select(selectTaxRate)),
      map(([products, taxRate]) => {
        const subtotal = products.reduce((sum, product) => sum + (product.qty * product.unitPrice), 0);
        return subtotal + (subtotal * taxRate);
      })
    );

    this.grandTotal$.subscribe(grandTotal => {
      if (grandTotal > 0) {
        this.toastsService.show(`Grand Total: $${grandTotal.toFixed(2)}`);
      }
    });

    // On component initialization, log to console and dispatch action to load products
    this.store.dispatch(loadAvailableProducts());
  }
}