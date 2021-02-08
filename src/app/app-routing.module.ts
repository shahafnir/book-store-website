import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: BooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
