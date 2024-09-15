/**
 * checkout.component.ts
 * 
 * This component represents the checkout view of the application. It allows users
 * to manage the checkout process, including selecting payment methods, entering
 * card expiration dates, and providing customer information.
 */
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { TotalsComponent } from "../totals/totals.component";
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { updateCardExpiration, updatePaymentMethod } from '../state/actions/payment-info.actions';
import { selectCardExpiration, selectPaymentMethod } from '../state/selectors/payment-info.selectors';
import { CommonModule } from '@angular/common';
import { selectCustomerAddress, selectCustomerName } from '../state/selectors/shipping-info.selectors';
import { updateCustomerAddress, updateCustomerName } from '../state/actions/shipping-info.actions';
import { ChosenProduct } from '../models/chosen-product.interface';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';
import { ActivatedRoute, Resolve, ResolveFn } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [TotalsComponent, CommonModule, ModalNotificationComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
// The CheckoutComponent class in the provided Angular code is responsible for 
// managing the checkout process in an e-commerce application.
export class CheckoutComponent implements OnInit {

  // Reference to the ModalNotificationComponent instance
  @ViewChild(ModalNotificationComponent) modalComponent!: ModalNotificationComponent;

  // These observables are tied to the application's state using NgRx 
  // selectors, which are functions that retrieve specific pieces of state 
  // from the store.
  paymentMethod$!: Observable<"credit card" | "pay pal" | "my pay" | null>;
  cardExpiration$!: Observable<Date | null>;
  cardExpirationString$!: Observable<string | null>;
  customerName$!: Observable<string | null>;
  customerAddress$!: Observable<string | null>;
  chosenProducts$!: Observable<ChosenProduct[]>;
  isPurchaseEnabled$!: Observable<boolean>;

  // The title from the activated route
  title: string | Type<Resolve<string>> | ResolveFn<string> | undefined; // data type returned by route.snapshot.routeConfig?.title

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { 
    this.title = this.route.snapshot.routeConfig?.title;
  }

  ngOnInit(): void {
    // Use selectors to get the current state
    this.paymentMethod$ = this.store.select(selectPaymentMethod);
    this.cardExpiration$ = this.store.select(selectCardExpiration);
    this.cardExpirationString$ = this.cardExpiration$.pipe(
      map(date => {
        let returnValue: string | null = null;
        if (date) {
          returnValue = this.formatDate(date);
        }

        return returnValue;
      })
    );

    // Use selectors to get the current shipping info state
    this.customerName$ = this.store.select(selectCustomerName);
    this.customerAddress$ = this.store.select(selectCustomerAddress);
    this.chosenProducts$ = this.store.select(selectChosenProductsState);

    // Combine the latest values from these observables and then maps them to a boolean value. 
    this.isPurchaseEnabled$ = combineLatest([
      this.paymentMethod$,
      this.cardExpiration$,
      this.customerName$,
      this.customerAddress$,
      this.chosenProducts$
    ]).pipe(
      // The mapping function checks if all required fields are filled 
      // (i.e., paymentMethod, cardExpiration, customerName, and customerAddress are
      // not null, and chosenProducts has at least one item).
      map(([paymentMethod, cardExpiration, customerName, customerAddress, chosenProducts]) =>
        !!paymentMethod && !!cardExpiration && !!customerName && !!customerAddress && chosenProducts.length > 0
      )
    );

  }

  // Placeholder function to handle the purchase button click
  onPurchase(): void {
    this.modalComponent.openModalNotification('Payment not accepted. The payment system is not yet available.');
  }

  // Dispatch update payment method action when the payment method changes
  onChangePaymentMethod(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Safely cast to HTMLSelectElement
    const newPaymentMethod = selectElement.value as "credit card" | "pay pal" | "my pay" | null; // these are the only possible values
    this.store.dispatch(updatePaymentMethod({ paymentMethod: newPaymentMethod }));
  }

  // Dispatch an action when the card expiration date changes
  onChangeCardExpiration(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Safely cast to HTMLInputElement
    const newExpiration = new Date(inputElement.value); // Convert the input value to a Date object
    this.store.dispatch(updateCardExpiration({ cardExpiration: newExpiration }));
  }

  // Format the card expiration date
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Simple conversion to 'YYYY-MM-DD'
  }

  // Dispatch an action when the customer name changes
  onChangeCustomerName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newName = inputElement.value;
    this.store.dispatch(updateCustomerName({ customerName: newName }));
  }

  // Dispatch an action when the customer address changes
  onChangeCustomerAddress(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newAddress = inputElement.value;
    this.store.dispatch(updateCustomerAddress({ customerAddress: newAddress }));
  }

}
