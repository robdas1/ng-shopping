import { Component, Type } from '@angular/core';
import { ActivatedRoute, Resolve, ResolveFn } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  title: string | Type<Resolve<string>> | ResolveFn<string> | undefined; // data type returned by route.snapshot.routeConfig?.title

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.routeConfig?.title;
  }

}