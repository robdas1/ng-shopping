/**
 * HeaderComponent
 * 
 * This file defines the HeaderComponent which is responsible for displaying the header section of the
 * application. The header includes navigation links and a summary of the cart. It uses Angular Router
 * for navigation and NgBootstrap for styling the navigation bar. The component also initializes the
 * route titles for display purposes.
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Define the HeaderComponent with its metadata
@Component({
  selector: 'app-header', // The HTML tag to use for this component
  standalone: true, // Indicates that this component is standalone
  imports: [
    RouterOutlet, // Enables the use of <router-outlet> directive for routing
    RouterLink, // Enables the use of [routerLink] directive for navigation
    RouterLinkActive, // Enables the use of [routerLinkActive] directive for active link styling
    NgbNavModule, // Imports NgBootstrap navigation module for styling
    CartSummaryComponent // Imports the CartSummaryComponent to display cart summary
  ],
  templateUrl: './header.component.html', // Path to the HTML template
  styleUrls: ['./header.component.css'] // Path to the CSS styles
})
export class HeaderComponent implements OnInit {
  // The currently active navigation tab
  active = 1;

  // A record to store route paths and their corresponding titles
  routeTitles: Record<string, string> = {}; // this datatype is equivalent to {[key:string]:string} but lint prefers it

  // Inject the Angular Router for navigation
  constructor(private router: Router) { }

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit(): void {
    // Iterate over the router configuration to extract route paths and titles
    this.router.config.forEach(route => {
      if (route.path && route.title) {
        // Store the route path and title in the routeTitles record
        this.routeTitles[route.path] = route.title as string;
      }
    });
  }
}