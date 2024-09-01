import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  appName = 'DTEK Online Shopping';
  appVersion = 'v0.3.6';
  appDescription = 'an Angular development, proof-of-concept. This simulated eCommerce site is intended to provide a recreational shopping experience.';
  currentYear = new Date().getFullYear();
}