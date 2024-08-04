import { Component, Input } from '@angular/core';
import { AvailableProduct } from '../models/available-product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-summary',
  standalone: true, // Enables standalone usage, no NgModule required
  imports: [CommonModule, RouterModule],
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent {
  @Input() product!: AvailableProduct;
}
