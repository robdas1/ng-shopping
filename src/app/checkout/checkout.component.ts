import { Component, OnInit } from '@angular/core';
import { TotalsComponent } from "../totals/totals.component";
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { updateCardExpiration, updatePaymentMethod } from '../state/actions/payment-info.actions';
import { selectCardExpiration, selectPaymentMethod } from '../state/selectors/payment-info.selectors';
import { CommonModule } from '@angular/common';
import { selectCustomerAddress, selectCustomerName } from '../state/selectors/shipping-info.selectors';
import { updateCustomerAddress, updateCustomerName } from '../state/actions/shipping-info.actions';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [TotalsComponent, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  paymentMethod$!: Observable<"credit card" | "pay pal" | "my pay" | null>;
  cardExpiration$!: Observable<Date | null>;
  cardExpirationString$!: Observable<string | null>;
  customerName$!: Observable<string | null>;
  customerAddress$!: Observable<string | null>;

  constructor(private store: Store<AppState>) { }

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

  }

  // src\app\checkout\checkout.component.ts
  onChangePaymentMethod(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Safely cast to HTMLSelectElement
    const newMethod = selectElement.value as "credit card" | "pay pal" | "my pay" | null; // Assuming these are the only possible values
    this.store.dispatch(updatePaymentMethod({ paymentMethod: newMethod }));
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
