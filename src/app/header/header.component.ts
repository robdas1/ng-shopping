import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class HeaderComponent {
  title = 'DTEK Online Shopping';
  version = 'v0.1.2';
}