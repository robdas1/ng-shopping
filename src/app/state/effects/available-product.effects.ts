import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { loadAvailableProducts, loadAvailableProductsFailure, loadAvailableProductsSuccess } from '../actions/available-product.actions';
import { AvailableProductService } from 'src/app/services/available-product.service';

@Injectable()
export class AvailableProductEffects {
  loadAvailableProductsEffect$;

  constructor(
    private actions$: Actions,
    private availableProductService: AvailableProductService
  ) {
    this.loadAvailableProductsEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadAvailableProducts),
        tap(() => console.debug('AvailableProductEffects: Fetching available products...')),
        mergeMap(() =>
          this.availableProductService.getAll().pipe(
            map(availableProducts => loadAvailableProductsSuccess({ availableProducts })),
            catchError(error => of(loadAvailableProductsFailure({ error })))
          )
        )
      )
    );
  }
}