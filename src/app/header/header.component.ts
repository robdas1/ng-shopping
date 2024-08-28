import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbNavModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class HeaderComponent {
  title = 'DTEK Online Shopping';
  active = 1;
}