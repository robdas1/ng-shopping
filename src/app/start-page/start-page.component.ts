/**
 * Start page component.
 * 
 * The start page provides a place to restart the application and navigate to the main
 * functionality of the app. It dispatches actions to reset and reload the state of the application.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { resetState } from '../state/actions/cross-state.actions';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    // On component initialization, dispatch action to to reset the state.
    this.store.dispatch(resetState());
  }

  navigateToStuff(): void {
    this.router.navigate(['/stuff']);
  }

}