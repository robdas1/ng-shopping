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
  appVersion = 'v0.2.6';
  appDescription = 'The best place to shop online';
  currentYear = new Date().getFullYear();
}