/**
 * app.config.ts
 * 
 * This file contains the application configuration for the Angular application.
 * It defines the providers for zone change detection and routing, which are
 * essential for the application's functionality.
 * 
 * For more information on the configuration options, see the Angular documentation:
 * https://angular.dev/guide/routing
 * 
 * The configuration includes:
 * - Zone change detection with event coalescing enabled.
 * - Router configuration with the application's routes.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,

      // Prevents initial navigation delays by blocking the page load until routing is ready. This isn't needed
      // at the moment, but it's included here for reference should the navigation become slow.
      // withEnabledBlockingInitialNavigation(), 

      // The following options were added to force the router to always scroll to the top of the page on navigation.
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Always scroll to top on navigation
      })
    )
  ]
};
