import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'DTEK Online Shopping';
  version = 'v0.0.19';

}
