/**
 * HeaderComponent
 * 
 * This file defines the HeaderComponent which is responsible for displaying the header section of the
 * application. The header includes navigation links and a summary of the cart. It uses Angular Router
 * for navigation and NgBootstrap for styling the navigation bar. The component also initializes the
 * route titles for display purposes.
 */

import { Component } from '@angular/core';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";

@Component({
  selector: 'app-header', 
  standalone: true, 
  imports: [
    CartSummaryComponent // Imports the CartSummaryComponent to display cart summary
  ],
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent  {
}