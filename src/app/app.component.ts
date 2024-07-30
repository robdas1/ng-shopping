
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
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store'; // NgRx Store for state management

import { AppState } from './state/app.state';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { loadAvailableProducts } from './state/actions/available-product.actions';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainLayoutComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-18-shopping v0.0.8';

  // Constructor injects the NgRx Store for state management
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // On component initialization, log to console and dispatch action to load products
    console.log('AppComponent: initializing...');
    // this.store.dispatch(loadAvailableProducts());
  }
}