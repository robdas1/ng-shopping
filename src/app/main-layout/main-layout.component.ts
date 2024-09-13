/**
 * Main Layout Component
 * 
 * This file defines the MainLayoutComponent, which serves as a container for the main content of the application.
 * Its primary role is to acts as the structural backbone of the application providing a `RouterOutlet` for Angular's 
 * router to insert components as the application's navigation changes. 
 */
import { NgIf } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true, // Enables standalone usage, no NgModule required
  imports: [
    NgIf, // Imports NgIf directive for conditional rendering
    RouterOutlet, // Imports RouterOutlet for routing functionality
    RouterLink, // Enables the use of [routerLink] directive for navigation
    RouterLinkActive, // Enables the use of [routerLinkActive] directive for active link styling
    NgbNavModule // Imports NgBootstrap navigation module for styling
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  // The currently active navigation tab
  active = 1;

  // A record to store route paths and their corresponding titles
  routeTitles: Record<string, string> = {}; // this datatype is equivalent to {[key:string]:string} but lint prefers it
  isNavMenuVisible = false;

  // Inject the Angular Router for navigation
  constructor(private router: Router) { }

  ngOnInit(): void {

    // Iterate over the router configuration to extract route paths and titles
    this.router.config.forEach(route => {
      if (route.path && route.title) {
        // Store the route path and title in the routeTitles record
        this.routeTitles[route.path] = route.title as string;
      }
    });

    // Subscribe to the router events to set visibility of the nav menu
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isNavMenuVisible = false;
        const currentUrl = this.router.url;
        if (typeof currentUrl === 'string') {
          this.isNavMenuVisible =
            ['/stuff', '/cart', '/checkout']
              .some(url => currentUrl.includes(url));
        } 
      });
  }

}