/**
 * Main Layout Component
 * 
 * This file defines the MainLayoutComponent, which serves as a container for the main content of the application.
 * Its primary role is to acts as the structural backbone of the application providing a `RouterOutlet` for Angular's 
 * router to insert components as the application's navigation changes. 
 */
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-main-layout',
  standalone: true, // Enables standalone usage, no NgModule required
  imports: [
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
  }

}