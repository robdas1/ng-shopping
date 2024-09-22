/**
 * Toasts Service
 * 
 * This service is responsible for managing toast notifications in the application. Toasts are
 * small messages that appear on the screen to provide feedback to the user. The service allows
 * adding new toasts with customizable options and removing existing toasts. It maintains a list
 * of toasts that can be displayed by a component.
 * 
 * The Toast interface defines the structure of a toast message, including the message text,
 * optional CSS class, and optional delay before the toast is automatically hidden.
 * 
 * The ToastsService class provides methods to show and remove toasts. The show method adds a new
 * toast to the list, and the remove method removes a specified toast from the list.
 */

import { Injectable } from '@angular/core';

// Interface defining the structure of a toast message
export interface Toast {
  message: string; // The message text to be displayed in the toast
  classname?: string; // Optional CSS class for styling the toast
  delay?: number; // Optional delay in milliseconds before the toast is hidden
}

// Injectable decorator marks this class as available for dependency injection
@Injectable({
  providedIn: 'root', // This service is provided at the root level, making it a singleton
})
export class ToastsService {
  // Array to hold the list of toasts
  toasts: Toast[] = [];

  /**
   * Adds a new toast to the list.
   * 
   * @param message - The message text to be displayed in the toast
   * @param options - Optional parameters for the toast (CSS class and delay)
   */
  show(
    message: string, 
    options: Partial<Toast> = {}) {
    // Add the new toast to the list, merging the message and options
    this.toasts.push({ message, ...options });
    console.log(message); // For simplicity, using console.log to output the message
  }

  /**
   * Removes a specified toast from the list.
   * 
   * @param toast - The toast to be removed
   */
  remove(toast: Toast) {
    // Filter out the specified toast from the list
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}