/**
 * app.routes.ts
 * 
 * This file defines the application's routes for the Angular application.
 * It maps URL paths to their corresponding components, enabling navigation
 * within the application. Additionally, it includes a default route and a 
 * wildcard route to handle undefined paths.
 */
import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
    { path: 'start', component: StartPageComponent },
    { path: 'stuff', component: ProductListComponent },
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'product/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: '**', redirectTo: '/start', pathMatch: 'full' }
];
