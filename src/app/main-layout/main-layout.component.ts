/**
 * Main Layout Component
 * 
 * This file defines the MainLayoutComponent, which serves as a container for the main content of the application.
 * Its primary role is to acts as the structural backbone of the application providing a `RouterOutlet` for Angular's 
 * router to insert components as the application's navigation changes. 
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout', 
  standalone: true, // Enables standalone usage, no NgModule required
  imports: [RouterOutlet], // Imports RouterOutlet for routing functionality
  templateUrl: './main-layout.component.html', 
  styleUrls: ['./main-layout.component.css'] 
})
export class MainLayoutComponent {
  // The class is intentionally left empty as its sole purpose is to provide a router-outlet
}