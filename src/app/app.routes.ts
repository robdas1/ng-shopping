import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
    { path: 'start', component: StartPageComponent },
    { path: 'stuff', component: ProductListComponent },
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: '**', redirectTo: '/start', pathMatch: 'full' }
];
