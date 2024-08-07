/**
 * app.config.ts
 * 
 * This file contains the application configuration for the Angular application.
 * It defines the providers for zone change detection and routing, which are
 * essential for the application's functionality.
 * 
 * The configuration includes:
 * - Zone change detection with event coalescing enabled.
 * - Router configuration with the application's routes.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // New for angular 18. Previous functionality has been verified through testing.
    provideRouter(routes)
  ]
};
