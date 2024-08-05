/**
 * AvailableProductEffects
 * 
 * This file contains the effects for the available products.
 * 
 * The loadAvailableProductsEffect$ effect listens for loadAvailableProducts actions,
 * calls the availableProductService.getAll() method when such an action is dispatched,
 * and then dispatches either a loadAvailableProductsSuccess action (if the service call 
 * is successful) or a loadAvailableProductsFailure action (if the service call fails).
 * 
 * NGRX Effects are used to handle side effects in response to dispatched actions. They provide 
 * a way to interact with services and isolate them from the components.
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AvailableProductService } from '../../services/available-product.service';
import {
  loadAvailableProducts,
  loadAvailableProductsSuccess,
  loadAvailableProductsFailure
} from '../actions/available-product.actions';

@Injectable()
export class AvailableProductEffects {

  // Note: 
  // As of angular 18, the property initializer for loadAvailableProductsEffect$ no longer runs after the constructor 
  // so it no longer has access to actions$. This is why this property is now being initialized in the constructor.
  loadAvailableProductsEffect$;

  constructor(
    private actions$: Actions,
    private availableProductService: AvailableProductService
  ) {

    // Effect for loading available products
    this.loadAvailableProductsEffect$ = createEffect(() =>

      // Listen for actions dispatched to the store.
      this.actions$.pipe(

        // Filter the pipe. Listen for loadAvailableProducts actions, and ignore all others.
        ofType(loadAvailableProducts),

        // Log when the action is dispatched
        tap(() => console.debug('AvailableProductEffects: Fetching available products...')),

        // For each sucessful loadAvailableProducts action, a loadAvailableProductsSuccess action is dispatched.
        mergeMap(() =>

          // Call the service to get the products
          this.availableProductService.getAll().pipe(

            // If the service call is successful, the Observable returned by getAll() emits a value
            // and the map function is called. It dispatches a loadAvailableProductsSuccess action.
            map(availableProducts => loadAvailableProductsSuccess({ availableProducts })),

            // If the service call fails, the Observable returned by getAll() emits an error
            // and the catchError function is called. It dispatches a loadAvailableProductsFailure action.
            catchError(error => of(loadAvailableProductsFailure({ error })))
          )
        )
      )
    );
  }
}