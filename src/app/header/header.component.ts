import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";

import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbNavModule, CartSummaryComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  active = 1;
  routeTitles: { [key: string]: string } = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.config.forEach(route => {
      if (route.path && route.title) {
        this.routeTitles[route.path] = route.title as string;
      }
    });
  }
}