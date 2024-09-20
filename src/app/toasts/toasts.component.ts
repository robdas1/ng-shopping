
/**
 * Toasts Component
 * 
 * TODO: rewrite this file header documentation properly
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

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 2000"
      (hidden)="toastService.remove(toast)"
    >
      {{ toast.message }}
    </ngb-toast>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 4.0rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1200;
    }
  `]
})
export class ToastsComponent {
  constructor(public toastService: ToastsService) {}
}
