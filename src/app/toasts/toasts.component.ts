/**
 * Toasts Component
 * 
 * This component is responsible for displaying toast notifications to the user. Toasts are small
 * messages that appear on the screen to provide feedback to the user. The component subscribes to
 * the ToastsService to get the list of toasts and displays them using the ng-bootstrap toast
 * component.
 * 
 * The ToastsComponent is a standalone component that imports CommonModule and NgbToastModule. It
 * uses Angular's *ngFor directive to iterate over the list of toasts and display each one. The
 * component also handles the removal of toasts when they are hidden.
 * 
 * The toasts are displayed in a fixed position at the top center of the screen. The position and
 * styling are controlled by the component's styles.
 * TODO: 
 * rewrite this properly
 * Toasts are small messages that appear on the screen to provide feedback to the user. 
 * There are three parts of displaying a toast.
 * 1. The message source.
 * 2. The collection of messages.
 * 3. The display of the messages.
 * The message source is the client application that generates the message. 
 * The collection of messages is a service that stores the messages and 
 * provides methods to add and remove them, see src\app\services\toasts.service.ts.
 * The display of the messages is a component that shows the messages to the user, 
 * see src\app\toasts\toasts.component.ts (this file).
 * The toasts are displayed in only one place, App Component, 
 * see src\app\app.component.html.
 * Toast messages can be requested from anywhere in the application using the ToastsService.
 * see README.md for more information. 
 */

import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from '../services/toasts.service';
import { CommonModule } from '@angular/common';

// Component decorator defines the metadata for the component
@Component({
  selector: 'app-toasts', // The selector used to include this component in a template
  standalone: true, // Indicates that this is a standalone component
  imports: [CommonModule, NgbToastModule], // Modules imported by this component
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 2000"
      (hidden)="toastService.remove(toast)"
    >
      <!-- Display the toast message -->
      {{ toast.message }}
    </ngb-toast>
  `,
  styles: [`
    :host {
      position: fixed; /* Fix the position of the toasts container */
      top: 4.0rem; /* Position the container 4.0rem from the top */
      left: 50%; /* Center the container horizontally */
      transform: translateX(-50%); /* Adjust the position to center the container */
      z-index: 1200; /* Ensure the container is above other elements */
    }
  `]
})
export class ToastsComponent {
  // Constructor injects the ToastsService
  constructor(public toastService: ToastsService) {}
}