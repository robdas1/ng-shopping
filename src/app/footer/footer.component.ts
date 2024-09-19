/**
 * FooterComponent
 * 
 * This file defines the FooterComponent which is responsible for displaying the footer section of the
 * application. The footer includes the application name, version, description, and the current year.
 * It also contains some static text about the purpose of the site.
 */

import { Component } from '@angular/core';

// Define the FooterComponent with its metadata
@Component({
  selector: 'app-footer', // The HTML tag to use for this component
  standalone: true, // Indicates that this component is standalone
  imports: [], // No additional modules are imported
  templateUrl: './footer.component.html', // Path to the HTML template
  styleUrls: ['./footer.component.css'] // Path to the CSS styles
})
export class FooterComponent {
  // The name of the application
  appName = 'DTEK Online Shopping';

  // The current version of the application
  appVersion = 'v0.4.21';

  // A brief description of the application
  appDescription = 'an Angular development project. This simulated eCommerce site is ' +
                   'intended to provide a recreational shopping experience.';

  // The current year, dynamically set to the current year
  currentYear = new Date().getFullYear();
}